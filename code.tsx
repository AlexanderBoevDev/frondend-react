import React, { useState } from "react";

const URL = "https://jsonplaceholder.typicode.com/users";

type Company = {
  bs: string;
  catchPhrase: string;
  name: string;
};

type User = {
  id: number;
  email: string;
  name: string;
  phone: string;
  username: string;
  website: string;
  company: Company;
  address: any
};

interface IButtonProps {
  onClick: any;
}

function Button({ onClick }: IButtonProps): JSX.Element {
  return (
    <button type="button" onClick={onClick}>
      get random user
    </button>
  );
}

interface IUserInfoProps {
  user: User;
}

function UserInfo({ user }: IUserInfoProps): JSX.Element {
  return !user ? (
    <div>
      <p>Click generate random user to see the user!</p>
    </div>
  ) : (
    <>
      <table>
        <thead>
        <tr>
          <th>Username</th>
          <th>Phone number</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>{user.name}</td>
          <td>{user.phone}</td>
        </tr>
        </tbody>
      </table>
    </>
  );
}

function App(): JSX.Element {

  const [item, setItem] = useState<any | null>(null);

  const receiveRandomUser = async () => {
    const id = Math.floor(Math.random() * (10 - 1)) + 1;
    const response = await fetch(`${URL}/${id}`);
    const _user = (await response.json()) as User;
    setItem(_user);
  };

  const handleButtonClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    receiveRandomUser();
  };

  return (
    <div>
      <header>Get a random user</header>
      <Button onClick={handleButtonClick} />
      <UserInfo user={item} />
    </div>
  );
}

export default App;
