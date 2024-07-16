/* eslint-disable react/prop-types */

const PageButton = ({ pageIndex, setPageIndex, buttonNumber }) => {
  return (
    <button
      type="button"
      disabled={buttonNumber === pageIndex + 1}
      className={`border-[1px] px-2 rounded-md ${
        buttonNumber === pageIndex + 1
          ? 'bg-slate-100 text-black border-black'
          : 'bg-[#28313d] text-slate-100 border-[#28313d] hover:bg-slate-100 hover:text-black transition-all'
      }`}
      onClick={() => setPageIndex(buttonNumber - 1)}>
      {buttonNumber}
    </button>
  );
};

export default PageButton;
