import { MdAdd } from "react-icons/md";
import Navbar from "../components/Navbar";
import NoteCard from "../components/NoteCard";
import AddEditNotes from "../components/AddEditNotes";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import axiosInstances from "../utils/axiosInstances";
import moment from "moment";
import Toast from "../components/Toast";
import EmptyCard from "../components/EmptyCard";

const Home = () => {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const [showtoastMsg, setShowToastMsg] = useState({
    isShown: false,
    message: "",
    type: "add",
  });

  const [allNotes, setAllNotes] = useState([]);
  const [userInfo, setUserInfo] = useState(null);

  const Navigate = useNavigate;

  // Get user info
  const getUserInfo = async () => {
    try {
      const response = await axiosInstances.get("/get-user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
      if (error.response && error.response.status === 401) {
        localStorage.clear();
        Navigate("/login");
      }
    }
  };

  const showToastMessage = (message, type) => {
    setShowToastMsg({ isShown: true, message, type });
  };
  const handleCloseToast = () => {
    setShowtoastMsg({ isShown: false, message: "", type: "add" });
  };

  // Get all note
  const getALlNotes = async () => {
    try {
      const response = await axiosInstances.get("/get-all-notes");

      if (response.data && response.data.notes) {
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log("Please try again ");
    }
  };

  const handleEditNote = (noteDetails) => {
    setOpenAddEditModal({ isShown: true, data: noteDetails, type: "edit" });
  };

  const handlePinNote = (note) => {
    // Implement pin note logic here
    console.log("Pin note:", note);
  };

  const deleteNote = async (data) => {
    const noteId = data._id;
    try {
      const response = await axiosInstances.delete("/delete-note/" + noteId);

      if (response.data && !response.data.error) {
        showtoastMsg("Note Deleted Successfully", "delete");
        getAllNotes();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        console.log("Please try again ");
      }
    }
  };

  useEffect(() => {
    getALlNotes();
    getUserInfo();
  }, []);

  return (
    <>
      <Navbar userInfo={userInfo} />
      <div className="container mx-auto">
        {allNotes.length > 0 ? (
          <div className="grid grid-cols-3 gap-4 mt-8">
            {allNotes &&
              allNotes.map((item, index) => (
                <NoteCard
                  key={item._id}
                  title={item.title}
                  date={item.createdOn}
                  content={item.content}
                  tags={item.tags}
                  isPinned={item.isPinned}
                  onEdit={() => handleEditNote(item)}
                  onDelete={() => deleteNote(item)}
                  onPinNote={() => handlePinNote(item)}
                />
              ))}
          </div>
        ) : (
          <EmptyCard />
        )}
      </div>
      <button
        className="w-12 h-12 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10"
        onClick={() => {
          setOpenAddEditModal({ isShown: true, type: "add", data: null });
        }}
      >
        <MdAdd className="text-[32px] text-white" />
      </button>
      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => {}}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
          },
        }}
        contentLabel=""
        className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll"
      >
        <AddEditNotes
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          onClose={() => {
            setOpenAddEditModal({ isShown: false, type: "add", data: null });
          }}
          getALlNotes={getALlNotes}
          showToastMessage={showtoastMsg}
        />
      </Modal>
      <Toast
        isShown={showtoastMsg.isShown}
        message={showtoastMsg.message}
        type={showtoastMsg.type}
        onClose={handleCloseToast}
      />
    </>
  );
};

export default Home;
