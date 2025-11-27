import { pool } from "../config/db.js";

export const createTask = async (req, res) => {
  try {
    const { title, description, priority_id, due_date } = req.body;

    if (!title || !priority_id || !due_date) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    if (Number.isNaN(priority_id)) {
      return res.status(400).json({ error: "Invalid priority id" });
    }

    const dueDate = new Date(due_date);
    dueDate.setDate(dueDate.getDate() + 1);

    if (Number.isNaN(dueDate.getTime())) {
      return res.status(400).json({ error: "Invalid due date" });
    }

    const now = new Date();
    if (dueDate <= now) {
      return res.status(400).json({
        error: "Due date must be greater then today",
      });
    }
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const result = await pool.query(
      `INSERT INTO tasks (user_id, title, description, priority_id, due_date)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING title, description, priority_id, due_date,status_id`,
      [userId, title, description, priority_id, dueDate]
    );

    return res
      .status(201)
      .json({ message: "Task created", task: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

export const getAllTasks = async (req, res) => {
  try {
    const {
      startDate = "",
      endDate = "",
      search = "",
      sortBy = "",
      order = "DESC",
      page = "1",
      pageSize = "10",
    } = req.query;

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const sizeNum = Math.min(100, Math.max(1, parseInt(pageSize, 10) || 10));
    const offset = (pageNum - 1) * sizeNum;
    const params = [];
    const where = [];

    if (
      startDate !== undefined &&
      startDate !== null &&
      String(startDate).trim() !== ""
    ) {
      const start_date = new Date(startDate);
      params.push(start_date);
      where.push(`(due_date >= $${params.length})`);
    }
    if (
      endDate !== undefined &&
      endDate !== null &&
      String(endDate).trim() !== ""
    ) {
      const end_date = new Date(endDate);
      params.push(end_date);
      where.push(`(due_date <= $${params.length})`);
    }

    if (search) {
      params.push(`%${search.trim()}%`);
      where.push(
        `(title ILIKE $${params.length} OR description ILIKE $${params.length})`
      );
    }
    params.push(req.user?.id);
    where.push(`(user_id = $${params.length})`);
    const whereSql = where.length ? `WHERE ${where.join(" AND ")}` : "";

    let orderBySql = "";
    if (sortBy.trim() === "high_priority") {
      orderBySql = `ORDER BY priority_id DESC NULLS LAST`;
    } else if (sortBy.trim() === "low_priority") {
      orderBySql = `ORDER BY priority_id ASC NULLS LAST`;
    } else if (sortBy.trim() === "due_date") {
      orderBySql = `ORDER BY due_date ${
        order.toUpperCase() === "ASC" ? "ASC" : "DESC"
      } NULLS LAST`;
    }

    const dataSql = `
      SELECT title,due_date,id,priority_id,description,status_id
      FROM tasks
      ${whereSql}
      ${orderBySql}
      LIMIT $${params.length + 1} OFFSET $${params.length + 2}
    `;
    const dataParams = [...params, sizeNum, offset];

    const countSql = `
      SELECT COUNT(*)::int AS total
      FROM tasks
      ${whereSql}
    `;

    const [dataResult, countResult] = await Promise.all([
      pool.query(dataSql, dataParams),
      pool.query(countSql, params),
    ]);

    const totalTasks = countResult.rows[0]?.total ?? 0;
    const totalPages = Math.max(1, Math.ceil(totalTasks / sizeNum));

    res.status(200).json({
      tasks: dataResult.rows,
      pagination: {
        totalTasks,
        totalPages,
        currentPage: pageNum,
        pageSize: sizeNum,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

export const getTask = async (req, res) => {
  const { taskId } = req.params;
  try {
    const result = await pool.query(
      "SELECT title,due_date,id,priority_id,description,status_id FROM tasks WHERE id = $1",
      [taskId]
    );

    if (result.rowCount === 0)
      return res.status(404).json({ message: "Task not found" });

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

export const updateTask = async (req, res) => {
  const { taskId } = req.params;
  try {
    const { title, description, status_id, priority_id, due_date } = req.body;
    const querysql = [];
    const params = [];
    if (title !== undefined && title !== null && String(title).trim() !== "") {
      params.push(title);
      querysql.push(`title = $${params.length}`);
    }
    if (
      description !== undefined &&
      description !== null &&
      String(description).trim() !== ""
    ) {
      params.push(description);
      querysql.push(`description = $${params.length}`);
    }
    if (
      status_id !== undefined &&
      status_id !== null &&
      String(status_id).trim() !== ""
    ) {
      const num = Number(status_id);
      if (Number.isNaN(num) || !Number.isInteger(num)) {
        return res
          .status(400)
          .json({ error: "Invalid status_id; must be an integer" });
      }
      params.push(Number(status_id));
      querysql.push(`status_id = $${params.length}`);
    }
    if (
      priority_id !== undefined &&
      priority_id !== null &&
      String(priority_id).trim() !== ""
    ) {
      const num = Number(priority_id);
      if (Number.isNaN(num) || !Number.isInteger(num)) {
        return res
          .status(400)
          .json({ error: "Invalid status_id; must be an integer" });
      }
      params.push(Number(priority_id));
      querysql.push(`priority_id = $${params.length}`);
    }
    if (
      due_date !== undefined &&
      due_date !== null &&
      String(due_date).trim() !== ""
    ) {
      const dueDate = new Date(due_date);
      dueDate.setDate(dueDate.getDate() + 1);

      if (Number.isNaN(dueDate.getTime())) {
        return res.status(400).json({ error: "Invalid due_date format" });
      }
      const now = new Date();
      if (dueDate <= now) {
        return res.status(400).json({
          error: "Due date must be greater then today",
        });
      }
      params.push(dueDate);
      querysql.push(`due_date = $${params.length}`);
    }

    params.push(taskId);
    const idCluse = `id=$${params.length}`;
    const finalQuery = `UPDATE tasks SET ${querysql} ,updated_at = NOW() WHERE ${idCluse} RETURNING title,due_date,id,priority_id,description,status_id `;
    const result = await pool.query(finalQuery, params);

    if (result.rowCount === 0)
      return res.status(404).json({ message: "Task not found" });

    res.json({ message: "Task updated", task: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

export const deleteTask = async (req, res) => {
  const { taskId } = req.params;
  try {
    const result = await pool.query("DELETE FROM tasks WHERE id = $1", [
      taskId,
    ]);

    if (result.rowCount === 0)
      return res.status(404).json({ message: "Task not found" });

    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
