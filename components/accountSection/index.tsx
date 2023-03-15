interface UserProps {
  firstName: string;
  lastName: string;
  registrationDate: string;
}

const Account: React.FC<UserProps> = ({
  firstName,
  lastName,
  registrationDate,
}) => {
  return (
    <div>
      <h1 className="font-bold text-[32px]">My Account</h1>
    </div>
  );
};

export default Account;
