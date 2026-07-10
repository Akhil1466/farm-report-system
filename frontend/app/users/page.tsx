"use client";


import { useEffect, useState } from "react";
import AddUserModal from "@/components/AddUserModal";
interface User {
  id: number;
  username: string;
  email: string;
  role: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const response = await fetch(
        "https://farm-report-system-testing.onrender.com/users"
      );

      const data = await response.json();
      setUsers(data);
    } catch (err) {
      console.error(err);
    }
  };

  // Delete User
  const deleteUser = async (id: number) => {
    const confirmDelete = confirm("Are you sure you want to delete this user?");

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `https://farm-report-system-testing.onrender.com/users/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        alert("✅ User Deleted Successfully");
        loadUsers();
      } else {
        alert("❌ Delete Failed");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Edit User
  const editUser = async (user: User) => {
    const username = prompt("Username", user.username);

    if (!username) return;

    const email = prompt("Email", user.email);

    if (!email) return;

    const role = prompt("Role (Admin/Manager/User)", user.role);

    if (!role) return;

    try {
      const response = await fetch(
        `https://farm-report-system-testing.onrender.com/users/${user.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            email,
            role,
          }),
        }
      );

      if (response.ok) {
        alert("✅ User Updated Successfully");
        loadUsers();
      } else {
        alert("❌ Update Failed");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main className="p-8">

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-3xl font-bold">
          👥 User Management
        </h1>

       <button
  onClick={() => setShowModal(true)}
  className="bg-green-700 hover:bg-green-800 text-white px-5 py-3 rounded-lg"
>
  ➕ Add User
</button>

      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="border-b">

              <th className="text-left py-3">Username</th>
              <th className="text-left py-3">Email</th>
              <th className="text-left py-3">Role</th>
              <th className="text-left py-3">Actions</th>

            </tr>

          </thead>

          <tbody>

            {users.map((user) => (

              <tr
                key={user.id}
                className="border-b"
              >

                <td className="py-4">
                  {user.username}
                </td>

                <td>
                  {user.email}
                </td>

                <td>
                  {user.role}
                </td>

                <td className="space-x-2">

                  <button
                    onClick={() => editUser(user)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                  >
                    ✏ Edit
                  </button>

                  <button
                    onClick={() => deleteUser(user.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                  >
                    🗑 Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>
{showModal && (
  <AddUserModal
    onClose={() => setShowModal(false)}
    onSuccess={loadUsers}
  />
)}
    </main>
  );
}