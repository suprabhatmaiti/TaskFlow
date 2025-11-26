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
    const result = await pool.query(
      "SELECT title,due_date,id,priority_id,description,status_id FROM tasks WHERE user_id=$1 ORDER BY id DESC",
      [req.user?.id]
    );
    const count = result.rows.length;
    res.json({ count: count, tasks: result.rows });
  } catch (err) {
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
    let querysql = [];
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
