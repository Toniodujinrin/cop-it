import SideBar from "./sideBar";
interface SignUpBarProps {
  children: JSX.Element;
}

const SignUpBar: React.FC<SignUpBarProps> = ({ children }) => {
  return (
    <div className="flex flex-row overflow-hidden h-screen justify-between">
      <SideBar />
      {children}
    </div>
  );
};

export default SignUpBar;
