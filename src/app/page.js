"use client";
import { useEffect, useState } from "react";

const API_URL = 'http://192.168.229.81:8000/api';

export default function Home() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    const res = await fetch(`${API_URL}/users`);
    const data = await res.json();
    setUsers(data.data || []);
    setFilteredUsers(data.data || []);
  }

  async function handleAddUser(e) {
    e.preventDefault();
    const res = await fetch(`${API_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
  
    if (!res.ok) {
      alert("Gagal menambahkan user");
      return;
    }
  
    alert("User berhasil ditambahkan");
    
    await fetchUsers();
  
    setName("");
    setEmail("");
    setPassword("");
  }  

  async function handleDeleteUser(id) {
    const isConfirmed = window.confirm("Apakah Anda yakin ingin menghapus user ini?");
    
    if (!isConfirmed) {
      return;
    }
  
    const res = await fetch(`${API_URL}/users/${id}`, {
      method: "DELETE"
    });
  
    if (!res.ok) {
      alert("Gagal menghapus user");
      return;
    }
  
    alert("User berhasil dihapus");
  
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
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Data User RiiDev Studio
      </h1>

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
            <div
              key={user.id}
              className="p-4 border bg-white rounded-lg shadow flex justify-between items-center"
            >
              <div>
                <h2 className="text-lg font-bold text-gray-800">{user.name}</h2>
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
      <h1 className="mt-10 text-3xl font-bold text-center text-gray-800 mb-6">
        Tambah User
      </h1>
      <form
        onSubmit={handleAddUser}
        className="mt-6 mb-6 space-y-4 bg-white p-4 rounded-lg shadow-md"
      >
        <input
          type="text"
          placeholder="Nama"
          value={name}
          onChange={(e) => setName(e.target.value)}
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
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-all"
        >
          Tambah User
        </button>
      </form>
    </main>
  );
}