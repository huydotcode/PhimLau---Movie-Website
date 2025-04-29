import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthProvider";
import { updateUserField } from "../services/updateInforService";
import { toast } from "sonner";

const UpdateInfo = () => {
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      displayName: user?.displayName || "",
      email: user?.email || "",
      phoneNumber: user?.phoneNumber || "",
    },
  });

  const [editField, setEditField] = useState(null);

  const onSubmit = async (data) => {
    const value = data[editField];

    try {
      await updateUserField(user?.uid, editField, value);
      user[editField] = value; // cập nhật local (nếu cần)
      toast.success(`Đã cập nhật ${editField} thành công!`);
      setEditField(null);
    } catch (error) {
      toast.error("Lỗi khi cập nhật: " + error.message);
    }
  };

  const getValidation = (name) => {
    switch (name) {
      case "displayName":
        return {
          required: "Tên hiển thị không được để trống.",
          minLength: {
            value: 3,
            message: "Tên phải ít nhất 3 ký tự.",
          },
        };
      case "email":
        return {
          required: "Email không được để trống.",
          pattern: {
            value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
            message: "Email không hợp lệ.",
          },
        };
      case "phoneNumber":
        return {
          required: "Số điện thoại không được để trống.",
          pattern: {
            value: /^(0|\+84)\d{9,10}$/,
            message:
              "Số điện thoại không hợp lệ (phải 10-11 số và đúng định dạng VN).",
          },
        };
      default:
        return {};
    }
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
            {...register(name, getValidation(name))}
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
              setValue(name, user[name] || "");
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
  if (!user) return null; // Nếu chưa có user, không render gì cả

  return (
    <div className="mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">🎯 Cập nhật thông tin cá nhân</h1>

      {/* Avatar */}
      <div className="flex items-center space-x-4 mb-6">
        <img
          src={user?.photoURL}
          alt="Avatar"
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <p className="text-lg font-semibold">{user?.displayName}</p>
          <p className="text-sm text-gray-400">{user?.email}</p>
        </div>
      </div>

      {renderField("Tên hiển thị", "displayName")}
      {renderField("Email", "email")}
      {renderField("Số điện thoại", "phoneNumber")}
    </div>
  );
};

export default UpdateInfo;
