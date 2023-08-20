import { AppDispatch, RootState } from "@/store";
import { fetchArticles, fetchCategories } from "@/thunks/articleThunk";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import Date from "../components/date";
import Head from "next/head";

export default function Home() {
  const dispatch: AppDispatch = useDispatch();
  const { data, total, limit, categories, isLoaded } = useSelector(
    (state: RootState) => state.articles
  );

  const [search, setSearch] = useState("");
  const [offset, setOffset] = useState(0);
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([""]);

  const handleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      // Remove the category from the selected list
      setSelectedCategories((prevSelected) =>
        prevSelected.filter((c) => c !== category)
      );
    } else {
      // Add the category to the selected list
      setSelectedCategories((prevSelected) => [...prevSelected, category]);
    }
    console.log(selectedCategories);
  };

  const handleSearch = async (e: any) => {
    e.preventDefault();
    setSearch(e.target.value);
    setOffset(0);
    setSelectedCategories([]);
  };

  const handlePagination = async (offset: number) => {
    setOffset(offset);
  };

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(
      fetchArticles({
        search,
        offset,
        category: selectedCategories.join(","),
      })
    );
    console.log("total", total);
  }, [dispatch, offset, search, selectedCategories]);

  return (
    <>
      <Head>
        <title>News</title>
      </Head>

      <div className="flex items-center justify-center  p-3 w-1/1">
        <div className=" flex w-full md:w-1/2">
          <form className="flex items-center w-full">
            <label htmlFor="simple-search" className="sr-only">
              Search
            </label>
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <input
                type="text"
                onChange={handleSearch}
                id="simple-search"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Search"
              />
            </div>
          </form>
          <div className="flex flex-col items-center relative justify-center p-4">
            <button
              id="dropdownDefault"
              onClick={() => setFilterDropdownOpen(!filterDropdownOpen)}
              data-dropdown-toggle="dropdown"
              className="text-white dark:bg-gray-700 hover:bg-gray-600 focus:ring-3 focus:outline-none focus:ring-primary-500 font-medium rounded-lg text-sm px-20 text-center inline-flex items-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              type="button"
            >
              Filter by category
              <svg
                className="w-4 h-4 ml-2"
                aria-hidden="true"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </button>
            {filterDropdownOpen && (
              <div
                id="dropdown"
                className="z-10 w-60 p-3 bg-white rounded-lg shadow absolute top-full dark:bg-slate-800"
              >
                <h6 className="mb-3 text-sm font-medium text-gray-900 dark:text-white">
                  Categories
                </h6>

                <button
                  type="button"
                  onClick={() => setFilterDropdownOpen(!filterDropdownOpen)}
                  className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-toggle="deleteModal"
                >
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
                <ul className="space-y-2 text-sm">
                  {categories?.map((category: any) => (
                    <li key={category} className="flex items-center">
                      <input
                        id="apple"
                        type="checkbox"
                        checked={selectedCategories.includes(category)}
                        onChange={() => handleCategory(category)}
                        className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label
                        htmlFor="category"
                        className="ml-2 text-sm font-medium capitalize text-gray-900 dark:text-gray-100"
                      >
                        {category}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 w-full justify-center items-center h-full my-10">
        {data.map((item: any) => (
          <div
            key={item._id}
            className="max-w-sm w-2/4 lg:max-w-full lg:flex  "
          >
            <div className="h-48 lg:h-auto lg:w-48 flex-none bg-cover relative rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden">
              <Image
                fill={true}
                src={
                  item?.image ||
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACoCAMAAABt9SM9AAAAElBMVEXy8vL////6+vr19fX4+Pj8/Px/aeudAAACoklEQVR4nO3c227bMBBF0cgk//+XGwu6kRxeRnFaVGevt8a2AG3QQ0kN8vUFAAAAAAAAAAAAAAAAAAAAAACAv2j5Ba9/fVK/hVgOxHL4Prf0+qD08FgfPbfw8Fjpk8cjlgOxHIjlQCwHYjlIxgoh3DqeXqyQbl+Ky8VK551L9B5PLFb40X2eWKyf3RVrxUpFrMU36KVihbKV88pCKtarfjzlWlpSsepWvh1RPZbr3JVi1SPLObSUYlkri1g7ZpZDGau6zGI3PJWxjKHV+3gqv6NSsXxX8KkqoxWrXFq98R7rkaYVq6jVaxWMpScWK6vVPW9rqKnF2r5e71e6G6G5+vRifZ9zjHFwyZDM9acYayx7PHEOeWIZ4pI5ViGxatW16/UFYlUfsy/HiFUx7iC3oxCrZDx73oc8sQrRarUNeWLlrKepx5AnVqbZaq0lHytmd3/tVu8jqccK2VuMjfA65NVjLdf3mBvhKYjHStuaWTU2wkst6Vj71+64MBiTjXV+7cL2dmK1XJdS+W9i5bI2qfoJsYpXy1rDEa8aq7ymitYPibWqr6nWIT+spRjL+sJNbYmCsexR3n5FOpYdYmZL1IvVmkxrif6WKBerPcXHW6JarN7SGW6JYrH6Q2m0JYrF6rYabolasQatRluiVKzJG5rmXFOKNXhyvOpuiUKxJh4rLP0tUSfW3JPj7ddm1GNNtuptiTKxxsN9194SVWLNDPesifUBkVhzw33X2hI1Ys0O911jS9SI5WzVukuUiDU/3A/vj1XrUSHWjVb2/44JxPJshEWYl/GzJzpieYf7ztgSHx/rbitrS3x8rDsDa7MeJ+0UYn2K9i+zOT09Fn8ueNbCH6Ked3+utxGLWMQCAAAAAAAAAAAAAAAAAAAAAAD4//0BUyATTom0AxcAAAAASUVORK5CYII="
                }
                alt={"image"}
              />
            </div>
            <div className="w-full border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
              <div className="mb-8">
                <span className="text-sm text-white  items-center capitalize bg-black  px-4  rounded-full inline-block">
                  {item?.category}
                </span>
                <div className="text-gray-900 font-bold text-xl mb-2">
                  {item?.title}
                </div>
                <p className="text-gray-700 text-base">{item?.description}</p>
              </div>
              <div className="flex items-center">
                <div className="text-sm">
                  <p className="text-gray-900 leading-none">{item?.source}</p>
                  <p className="text-gray-600">
                    {item?.published_at && (
                      <Date dateString={item?.published_at} />
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <nav
        aria-label="Page navigation example"
        className="flex items-center justify-center my-10"
      >
        <ul className="inline-flex -space-x-px text-base h-10">
          {offset > 0 && (
            <>
              <li>
                <a
                  href="#"
                  onClick={() => handlePagination(offset - 1)}
                  className="flex items-center justify-center px-4 h-10 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Previous
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={() => handlePagination(offset - 1)}
                  className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  {offset}
                </a>
              </li>
            </>
          )}
          <li>
            <a
              href="#"
              className="flex items-center justify-center px-4 h-10 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
            >
              {offset + 1}
            </a>
          </li>
          {isLoaded && limit * (offset + 1) < total && (
            <>
              <li>
                <a
                  href="#"
                  aria-current="page"
                  onClick={() => handlePagination(offset + 1)}
                  className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  {offset + 2}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={() => handlePagination(offset + 1)}
                  className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Next
                </a>
              </li>
            </>
          )}
        </ul>
      </nav>
    </>
  );
}
