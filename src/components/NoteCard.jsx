import { MdOutlinePushPin } from "react-icons/md";
import { MdCreate, MdDelete } from "react-icons/md";
import moment from "moment";
import PropTypes from "prop-types";

const NoteCard = ({
  title,
  date,
  content,
  tags,
  isPinned,
  onEdit,
  onDelete,
  onPinNote,
}) => {
  return (
    <div className="border rounded p-3 md:p-4 bg-white hover:shadow-xl transition-all ease-in-out ">
      <div className="flex items-center justify-between">
        <div className="pr-2">
          <h6 className="text-sm font-medium line-clamp-1">{title}</h6>
          <span className="text-xs text-gray-500">
            {moment(date).format("Do MMM YYYY")}
          </span>
        </div>

        <MdOutlinePushPin
          className={`icon-btn flex-shrink-0 ${
            isPinned ? "text-primary" : "text-slate-300"
          }`}
          onClick={onPinNote}
        />
      </div>

      <p className="text-xs text-slate-600 mt-2 line-clamp-3">{content}</p>
      <div className="flex items-center justify-between mt-2 flex-wrap">
        <div className="text-xs text-slate-500 overflow-hidden overflow-ellipsis whitespace-nowrap max-w-[75%]">
          {tags.map((item, index) => (
            <span key={index} className="mr-1">
              #{item}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-2 mt-1 sm:mt-0">
          <MdCreate
            className="icon-btn hover:text-green-600"
            onClick={onEdit}
          />
          <MdDelete
            className="icon-btn hover:text-red-600"
            onClick={onDelete}
          />
        </div>
      </div>
    </div>
  );
};

NoteCard.propTypes = {
  title: PropTypes.string.isRequired,
  date: PropTypes.string,
  content: PropTypes.string,
  tags: PropTypes.array,
  isPinned: PropTypes.bool,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onPinNote: PropTypes.func.isRequired,
};

NoteCard.defaultProps = {
  tags: [],
  isPinned: false,
  content: "",
};

export default NoteCard;
