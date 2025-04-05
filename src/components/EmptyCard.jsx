import PropTypes from "prop-types";

const EmptyCard = ({ imgSrc, message }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[40vh] md:min-h-[60vh] px-4 py-8 md:py-0 text-center">
      {imgSrc && (
        <img
          src={imgSrc}
          alt="Empty state"
          className="w-24 h-24 md:w-32 md:h-32 mb-3 md:mb-4"
        />
      )}
      <p className="text-base md:text-lg text-gray-500">
        {message || "No notes found. Click the + button to create one."}
      </p>
    </div>
  );
};

EmptyCard.propTypes = {
  imgSrc: PropTypes.string,
  message: PropTypes.string,
};

EmptyCard.defaultProps = {
  imgSrc: null,
  message: "No notes found. Click the + button to create one.",
};

export default EmptyCard;
