import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { orbit } from "ldrs";
import toast from "react-hot-toast";
import useSWR from "swr";
import ProductEditSkeleton from "./ProductEditSkeleton";

orbit.register();

// Default values shown

const fetcher = (url) => fetch(url).then((res) => res.json());
const ProductEditCard = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const { id } = useParams();

  const { data, isLoading, error } = useSWR(
    import.meta.env.VITE_API_URL + "/products/" + id,
    fetcher
  );

  const [isSending, setIsSending] = useState(false);

  const navigate = useNavigate();

  const handleUpdateProduct = async (data) => {
    setIsSending(true);
    // //  data.created_at=new Date().toISOString();
    await fetch(import.meta.env.VITE_API_URL + "/products/" + id, {
      method: "PUT",
      body: JSON.stringify({
        product_name: data.product_name,
        price: data.price,
        created_at: new Date().toISOString(),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setIsSending(false);
    if (data.back_to_product_list) {
      navigate("/product");
    }
    toast.success("Product Update Successfully");
    console.log(data);
  };

  //!For use SWR Retch Data
  // if (isLoading) return <p>lOADING ..</p>;

  // console.log(data);


  return (
    <div className=" rounded-lg p-5 w-full md:w-1/2">
      <h1 className="text-gray-700 text-xl font-bold">Edit Product</h1>
      <p className="text-stone-500 mb-3">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur,
        similique nam doloribus
      </p>

      {isLoading ? (
        <ProductEditSkeleton />
      ) : (
        <form onSubmit={handleSubmit(handleUpdateProduct)}>
          <div className="mb-5">
            <label
              htmlFor="first_name"
              className={`block mb-2 text-sm font-medium  ${
                errors.product_name ? "text-red-500" : "text-gray-900"
              } dark:text-white`}
            >
              Product Name
            </label>
            <input
              {...register("product_name", {
                required: true,
                minLength: 3,
                maxLength: 40,
              })}
              defaultValue={data?.data?.product_name}
              type="text"
              className={`bg-gray-50 border font-semibold ${
                errors.product_name
                  ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                  : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              } text-gray-900 text-sm rounded-lg
              block w-full p-2.5 dark:bg-gray-700
              dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
              placeholder="eg.UI/UX Design"
            />
            {errors.product_name?.type === "required" && (
              <p className="text-red-500 text-sm mt-1">
                Product name is required
              </p>
            )}
            {errors.product_name?.type === "minLength" && (
              <p className="text-red-500 text-sm mt-1">
                Product name must be greater than 3 characters
              </p>
            )}
            {errors.product_name?.type === "maxLength" && (
              <p className="text-red-500 text-sm mt-1">
                Product name must be less than 40 characters
              </p>
            )}
          </div>
          <div className="mb-8">
            <label
              htmlFor="last_name"
              className={`block mb-2 text-sm font-medium ${
                errors.price ? "text-red-500" : "text-gray-900"
              } dark:text-white`}
            >
              Product Price
            </label>
            <input
              {...register("price", {
                required: true,
                min: 1000,
                max: 10000,
              })}
              defaultValue={data?.data?.price}
              type="number"
              className="bg-gray-50 border  font-semibold  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="eg.1000$"
            />
            {errors.price?.type === "required" && (
              <p className="text-red-500 text-sm mt-1">
                Product price is required
              </p>
            )}
            {errors.price?.type === "min" && (
              <p className="text-red-500 text-sm mt-1">
                Product price must be greater than 100 character
              </p>
            )}
            {errors.price?.type === "max" && (
              <p className="text-red-500 text-sm mt-1">
                Product price must be less than 10000 characters
              </p>
            )}
          </div>
          <div className="mb-3">
            <div className="flex items-center mb-4">
              <input
                required
                {...register("all_correct")}
                id="all_correct"
                type="checkbox"
                defaultValue
                className="w-4 h-4 bg-emerald-700 border-gray-300 rounded focus:ring-emerald-500 dark:focus:ring-emerald-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="all_correct"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Make sure all field are correct
              </label>
            </div>
          </div>
          <div className="mb-3">
            <div className="flex items-center mb-4">
              <input
                {...register("back_to_product_list")}
                id="back_to_product_list"
                type="checkbox"
                checked
                defaultValue
                className="w-4 h-4 bg-emerald-700 border-gray-300 rounded focus:ring-emerald-500 dark:focus:ring-emerald-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="back_to_product_list"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Back to Product List after save
              </label>
            </div>
          </div>
          <Link
            to="/product"
            type="button"
            className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            Cancel
          </Link>

          <button
            type="submit"
            className="text-white  bg-emerald-700 hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <span>Update Product</span>
            {isSending && (
              <l-orbit size="20" speed="1.5" color="white"></l-orbit>
            )}
          </button>
        </form>
      )}
    </div>
  );
};

export default ProductEditCard;
