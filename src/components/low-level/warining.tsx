import warn from "../../assets/icons/warn.svg";

const Warning = () => {
  return (
    <div className="flex gap-[12px] lg:gap-[16px] items-center bg-[#F7981D1A] px-[12px] lg:px-[16px] py-[8px] lg:py-[12px] rounded-[12px]">
      <div>
        <img src={warn} alt="" className="w-[40px]" />
      </div>
      <div className="flex flex-col gap-[2px] lg:gap-[4px]">
        {/* <p className="text-[14px] lg:text-[16px] font-[500]">Under Active Development</p> */}
        <p className="text-[12px] lg:text-[14px] font-[400]">
          Warning: These contracts are unaudited and are under active development, please avoid depositing significant capital as terms and functionality may change
        </p>
      </div>
    </div>
  );
};

export default Warning;
