import { MdAdd, MdClose } from "react-icons/md";
import { useState } from "react";
import PropTypes from "prop-types";

const TagInput = ({ tags, setTags }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const addNewTag = () => {
    if (inputValue.trim() !== "") {
      setTags([...tags, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addNewTag();
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div>
      {tags?.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap mt-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="flex items-center gap-1 md:gap-2 text-xs md:text-sm text-slate-900 bg-slate-100 px-2 md:px-3 py-1 rounded mb-1"
            >
              #{tag}
              <button
                onClick={() => {
                  handleRemoveTag(tag);
                }}
                className="p-1"
              >
                <MdClose className="text-sm md:text-base" />
              </button>
            </span>
          ))}
        </div>
      )}
      <div className="flex items-center gap-2 md:gap-4 mt-3">
        <input
          type="text"
          value={inputValue}
          className="w-full text-xs md:text-sm bg-transparent border px-2 md:px-3 py-1 md:py-2 rounded outline-none"
          placeholder="Add tags"
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <button
          className="w-7 h-7 md:w-8 md:h-8 flex-shrink-0 flex items-center justify-center rounded border border-blue-700 hover:bg-blue-700"
          onClick={() => {
            addNewTag();
          }}
        >
          <MdAdd className="text-xl md:text-2xl text-blue-700 hover:text-white" />
        </button>
      </div>
    </div>
  );
};

TagInput.propTypes = {
  tags: PropTypes.array,
  setTags: PropTypes.func.isRequired,
};

TagInput.defaultProps = {
  tags: [],
};

export default TagInput;
