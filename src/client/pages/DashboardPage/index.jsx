import { useEffect, useRef, useState } from "react";
import AddTaskModal from "./addTaskModal/AddTaskModal";
import api from "../../utils/api";
import LoadingOverlay from "../../components/LoadingOverlay";
import { getTasks } from "../../services/taskServices";
import TaskList from "./TaskList/TaskList";
import { FaSearch } from "react-icons/fa";
import FilterBox from "./FilterBox";
import { toast } from "react-toastify";
function DashboardPage() {
  const [openTaskModal, setOpenTaskModal] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [toRefresh, setToRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [openFilter, setOpenFilter] = useState(false);
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  useEffect(() => {
    let mounted = true;
    async function fetchTasks() {
      try {
        setLoading(true);
        const param = {
          startDate: filters.startDate,
          endDate: filters.endDate,
          page: page,
          search: searchTerm,
        };
        // console.log(param);
        const { data } = await getTasks(param);

        // console.log(data);
        const taskData = data?.tasks;
        // setTasks(taskData);
        setTasks((prev) => {
          if (page === 1) {
            return taskData;
          } else {
            return [...prev, ...taskData];
          }
        });
        setPage(data?.pagination?.currentPage || 1);
        setTotalPages(data?.pagination?.totalPages || 1);

        const pg = data?.pagination || {};
        if (pg.currentPage !== page) {
          setPage(pg.currentPage);
        }
      } catch (err) {
        if (!mounted) return;
        console.error("Failed to fetch tasks:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchTasks();

    return () => {
      mounted = false;
    };
  }, [toRefresh, page]);

  useEffect(() => {
    const toggleFilter = (e) => {
      if (!filterRef.current.contains(e.target)) {
        setOpenFilter(false);
      }
    };

    document.addEventListener("pointerdown", toggleFilter);
    return () => {
      document.removeEventListener("pointerdown", toggleFilter);
    };
  }, [openFilter, page]);

  const handleAddBtnClick = () => {
    setOpenTaskModal(true);
  };
  const handleRefresh = () => {
    setToRefresh(!toRefresh);
  };
  const handleSearch = (e) => {
    e.preventDefault();
    setFilters({
      startDate: "",
      endDate: "",
    });
    setToRefresh(!toRefresh);
  };

  const hadleOpenFilter = () => {
    setOpenFilter(!openFilter);
  };

  const handleFilterApply = () => {
    if (filters.startDate !== "" || filters.endDate !== "") {
      setToRefresh(!toRefresh);
      setOpenFilter(false);
    } else {
      toast.error("fill both from and to date ");
    }
    setSearchTerm("");
  };

  const filterRef = useRef();
  const hasMore = page < totalPages;

  const handleLoadMore = () => {
    if (hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <div className="min-h-screen p-6 md:p-10 text-gray-900">
      <div className="flex justify-between items-center mb-10">
        <h1 className=" text-xl md:text-3xl font-bold">Your Tasks</h1>

        <div className="flex justify-end items-center gap-2">
          <div className="relative" ref={filterRef}>
            <button
              onClick={hadleOpenFilter}
              className="border border-gray-400 px-4 py-1 rounded-lg bg-gray-200 font-semibold hover:bg-gray-400 active:bg-gray-200 cursor-pointer"
            >
              Filter
            </button>
            {openFilter && (
              <FilterBox
                filters={filters}
                onChange={handleFilterChange}
                onApply={handleFilterApply}
              />
            )}
          </div>
          <button
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm md:text-lg rounded-lg"
            onClick={handleAddBtnClick}
          >
            Add Task
          </button>
        </div>
      </div>
      <div className="mb-6 w-full ">
        <form
          onSubmit={handleSearch}
          className="flex items-center justify-between gap-1"
        >
          <input
            className="border border-gray-400 w-full rounded-full p-2"
            type="text"
            placeholder="Search Task"
            value={searchTerm}
            onChange={onSearchChange}
          />
          <button className="text-blue-600 text-xl font-5xl hover:bg-gray-200 rounded-full p-2 cursor-pointer">
            <FaSearch />
          </button>
        </form>
      </div>
      <div className="w-full">
        <div>
          {tasks.length === 0 ? (
            loading ? (
              <LoadingOverlay />
            ) : (
              <p className="text-lg text-gray-400">
                "No task found, Please create a new task"
              </p>
            )
          ) : (
            <TaskList tasks={tasks} setRefresh={handleRefresh} />
          )}
        </div>
        <div className="flex justify-center mt-8 pb-20">
          {tasks.length !== 0 && (
            <button
              onClick={handleLoadMore}
              disabled={!hasMore || loading}
              className="bg-gray-700 hover:bg-gray-600 disabled:opacity-40 text-white px-6 py-2 rounded-lg font-semibold transition"
            >
              {loading ? "Loading..." : hasMore ? "Load More" : "No Tasks"}
            </button>
          )}
        </div>
      </div>
      {openTaskModal && (
        <AddTaskModal
          closeModal={setOpenTaskModal}
          setRefresh={handleRefresh}
        />
      )}
    </div>
  );
}

export default DashboardPage;
