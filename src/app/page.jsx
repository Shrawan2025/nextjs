"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Page = () => {
  const [user, setUser] = useState([]);
  const [edit, setEdit] = useState(null);

  let getUsers = () => {
    axios.get("/api/user").then((res) => {
      setUser(res.data.users);
    });
  };

  useEffect(() => {
    getUsers();
  }, []);

  const { register, handleSubmit, reset, setValue } = useForm();

  const onSubmit = async (data) => {
    if (edit) {
      try {
        await axios.put(`/api/user/${edit}`, data);
        toast.success("User updated successfully!");
        reset();
        setEdit(null);
        getUsers();
      } catch (error) {
        toast.error("Failed to update user!");
        console.error(error);
      }
    } else {
      await axios.post("/api/user", data);
      toast.success("User added successfully!");
      reset();
      getUsers();
    }
  };

  const deleteId = async (id) => {
    try {
      await axios.delete(`/api/user/${id}`);

      toast.success("User deleted successfully!");
      getUsers();
    } catch (error) {
      toast.error("Failed to delete user!");
      console.error(error);
    }
  };

  const editId = async (user) => {
    setEdit(user._id);
    setValue("name", user.name);
    setValue("email", user.email);
  };

  return (
    <section>
      <div className="w-1/2 mx-auto p-2 shadow">
        <h2>Simple CRUD</h2>
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          <div className="py-2 space-x-3">
            <input
              className="border p-2"
              placeholder="Enter Name"
              {...register("name")}
            />

            <input
              className="border p-2"
              placeholder="Enter Email"
              {...register("email")}
            />

            <input
              type="file"
              accept="image/*"
              className="border p-2"
              {...register("image")}
            />

            <button className="bg-amber-700 rounded-md text-white p-2">
              {edit ? "Update" : "Send"}
            </button>
          </div>
        </form>

        <h2>User List</h2>

        <table className="w-full">
          <thead>
            <tr className="border p-2">
              <th className="p-2 border">S.no</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Image</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>

          <tbody>
            {user.map((a, index) => (
              <tr key={a._id} className="border p-2">
                <td className="p-2 border">{a._id}</td>
                <td className="p-2 border">{a.name}</td>
                <td className="p-2 border">{a.email}</td>
                <td className="p-2 border">{a.image}</td>
                <td className="p-2 border">
                  <button
                    className="bg-green-500 border rounded-md px-2 cursor-pointer active:scale-90 me-2"
                    onClick={() => editId(a)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 border rounded-md px-2 cursor-pointer active:scale-90"
                    onClick={() => deleteId(a._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
    </section>
  );
};

export default Page;
