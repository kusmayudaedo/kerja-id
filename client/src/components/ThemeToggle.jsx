import { IoIosSunny, IoIosMoon } from "react-icons/io";
import { useDashboardContext } from "../pages/DashboardLayout";

const ThemeToggle = () => {
  const { isDarkTheme, toggleTheme } = useDashboardContext();
  return (
    <div className='text-xl'>
      {isDarkTheme ? (
        <button onClick={toggleTheme}>
          <IoIosSunny />
        </button>
      ) : (
        <button onClick={toggleTheme}>
          <IoIosMoon />
        </button>
      )}
    </div>
  );
};

export default ThemeToggle;
