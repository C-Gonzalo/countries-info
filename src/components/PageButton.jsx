/* eslint-disable react/prop-types */

const PageButton = ({ page, handleQueryParamsPage, buttonNumber }) => {
  return (
    <button
      type="button"
      disabled={buttonNumber === page}
      className={`border-[1px] px-2 rounded-md ${
        buttonNumber === page
          ? 'bg-slate-100 text-black border-black'
          : 'bg-[#28313d] text-slate-100 border-[#28313d] hover:bg-slate-100 hover:text-black transition-all'
      }`}
      onClick={() => handleQueryParamsPage(buttonNumber)}>
      {buttonNumber}
    </button>
  );
};

export default PageButton;
