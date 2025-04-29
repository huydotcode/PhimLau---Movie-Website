import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthProvider";

const UpdateInfo = () => {
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      displayName: user.displayName || "",
      email: user.email || "",
      phoneNumber: user.phoneNumber || "",
    },
  });

  const [editField, setEditField] = useState(null);

  const onSubmit = async (data) => {
    console.log("Data submitted:", data);
    // TODO: Thực hiện cập nhật lên Firebase hoặc API của bạn ở đây
    setEditField(null);
  };

  const renderField = (label, name, type = "text") => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-400 mb-1">
        {label}
      </label>
      {editField === name ? (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex items-center space-x-2"
        >
          <input
            {...register(name, { required: `${label} không được để trống.` })}
            type={type}
            className="bg-secondary text-white px-3 py-2 rounded w-full"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-primary text-white px-3 py-1 rounded"
          >
            Lưu
          </button>
          <button
            type="button"
            onClick={() => {
              setEditField(null);
              setValue(name, user[name] || ""); // reset nếu hủy
            }}
            className="text-gray-400 text-sm hover:text-red-500"
          >
            Hủy
          </button>
        </form>
      ) : (
        <div className="flex items-center justify-between bg-foreground p-3 rounded">
          <span>
            {user[name] || <em className="text-gray-500">Chưa có</em>}
          </span>
          <button
            onClick={() => setEditField(name)}
            className="text-primary text-sm hover:underline"
          >
            Sửa
          </button>
        </div>
      )}
      {errors[name] && (
        <p className="text-red-400 text-sm mt-1">{errors[name]?.message}</p>
      )}
    </div>
  );

  return (
    <div className="mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">🎯 Cập nhật thông tin cá nhân</h1>

      {/* Avatar */}
      <div className="flex items-center space-x-4 mb-6">
        <img
          src={user.photoURL}
          alt="Avatar"
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <p className="text-lg font-semibold">{user.displayName}</p>
          <p className="text-sm text-gray-400">{user.email}</p>
        </div>
      </div>

      {/* Form fields */}
      {renderField("Tên hiển thị", "displayName")}
      {renderField("Email", "email")}
      {renderField("Số điện thoại", "phoneNumber")}
    </div>
  );
};

export default UpdateInfo;
