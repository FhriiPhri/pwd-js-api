"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const url = "https://jsonplaceholder.typicode.com/users";
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchUsers() {
      const res = await fetch(url);
      const data = await res.json();
      setUsers(data);
      setFilteredUsers(data);
    }
    fetchUsers();
  }, []);

  async function handleAddUser(e) {
    e.preventDefault();
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ name, username, email }),
    });
    const newUser = await res.json();
    newUser.id = users.length + 1;
    setUsers([newUser, ...users]);
    setFilteredUsers([newUser, ...users]);
    setName("");
    setUsername("");
    setEmail("");
  }

  async function handleDeleteUser(id) {
    await fetch(`${url}/${id}`, { method: "DELETE" });
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers);
  }

  function handleSearch(e) {
    const keyword = e.target.value.toLowerCase();
    setSearch(keyword);
    const filtered = users.filter((user) =>
      user.name.toLowerCase().includes(keyword)
    );
    setFilteredUsers(filtered);
  }

  return (
    <main className="max-w-3xl mx-auto p-6 bg-gray-100 shadow-lg rounded-lg mt-10">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Data User RiiDev Studio</h1>


      {/* Pencarian */}
      <input
        type="text"
        placeholder="Cari Nama..."
        value={search}
        onChange={handleSearch}
        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 mb-4"
      />

      {/* List Usernya */}
      <div className="space-y-4">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div key={user.id} className="p-4 border bg-white rounded-lg shadow flex justify-between items-center">
              <div>
                <h2 className="text-lg font-bold text-gray-800">{user.name}</h2>
                <p className="text-gray-600">Username : {user.username}</p>
                <p className="text-gray-600">Email : {user.email}</p>
              </div>
              <button
                onClick={() => handleDeleteUser(user.id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-all"
              >
                Hapus
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">Tidak ada user ditemukan.</p>
        )}
      </div>

      {/* Form Tambah User Baru */}
      <h1 className="mt-10 text-3xl font-bold text-center text-gray-800 mb-6">Tambah User</h1>
      <form onSubmit={handleAddUser} className="mt-6 mb-6 space-y-4 bg-white p-4 rounded-lg shadow-md">
        <input
          type="text"
          placeholder="Nama"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-all">
          Tambah User
        </button>
      </form>
    </main>
  );
}