import { NextPage } from "next";
import { useSelector, useDispatch } from "react-redux";

import { AppDispatch, RootState } from "../store";
import { fetchArticles } from "../thunks/articleThunk";
import { useEffect, useState } from "react";
import { Article } from "../slices/articleSlice";
import { useRouter } from "next/router";
import { ModalDelete } from "../components/deleteModal";
import ModalUpdate from "../components/updateModal";
import ModalCreate from "../components/addNewModal";
import Head from "next/head";
import Image from "next/image";

const Admin: NextPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();
  const { data, total, limit, isLoaded } = useSelector(
    (state: RootState) => state.articles
  );
  const [search, setSearch] = useState("");
  const [offset, setOffset] = useState(0);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [article, setArticle] = useState<Article | undefined>(undefined);

  const closeModal = () => {
    setIsUpdateOpen(false);
  };
  const closeDeleteModal = () => {
    setIsDeleteOpen(false);
  };
  const closeCreateModal = () => {
    setIsCreateOpen(false);
  };
  const handlePagination = async (offset: number) => {
    setOffset(offset);
  };

  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      router.push("/login");
    }
    dispatch(
      fetchArticles({
        search,
        offset,
        category: "",
      })
    );
  }, [dispatch, isUpdateOpen, router, offset]);

  return (
    <>
      <Head>
        <title>Admin</title>
      </Head>
      <div className="w-screen h-screen dark:bg-slate-800">
        <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5 antialiased ">
          <div className="mx-auto  px-4 lg:px-12">
            {/* <!-- Start coding here --> */}
            <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
              <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                <div className="w-full md:w-full flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-around justify-between md:space-x-3 flex-shrink-0">
                  <button
                    type="button"
                    onClick={() => setIsCreateOpen(true)}
                    id="createProductModalButton"
                    data-modal-target="createProductModal"
                    data-modal-toggle="createProductModal"
                    className="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
                  >
                    <svg
                      className="h-3.5 w-3.5 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        clipRule="evenodd"
                        fillRule="evenodd"
                        d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                      />
                    </svg>
                    Add item
                  </button>
                  <div className="flex items-center space-x-3 w-full md:w-auto">
                    <button
                      onClick={() => {
                        localStorage.removeItem("token");
                        router.push("/login");
                      }}
                      className="border-2 border-yellow-600 rounded-lg px-3 py-2 text-yellow-400 cursor-pointer hover:bg-yellow-600 hover:text-yellow-200"
                    >
                      LOG OUT
                    </button>
                  </div>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-4 py-4">
                        News Title
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Image
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Category
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Source
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Description
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Published at
                      </th>
                      <th scope="col" className="px-4 py-3">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {isLoaded &&
                      data.map((article) => {
                        return (
                          <tr
                            key={article._id}
                            className="border-b dark:border-gray-700"
                          >
                            <th
                              scope="row"
                              className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                              {article.title}
                            </th>
                            <td className="px-4 py-3">
                              <Image
                                src={
                                  article?.image ||
                                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACoCAMAAABt9SM9AAAAElBMVEXy8vL////6+vr19fX4+Pj8/Px/aeudAAACoklEQVR4nO3c227bMBBF0cgk//+XGwu6kRxeRnFaVGevt8a2AG3QQ0kN8vUFAAAAAAAAAAAAAAAAAAAAAACAv2j5Ba9/fVK/hVgOxHL4Prf0+qD08FgfPbfw8Fjpk8cjlgOxHIjlQCwHYjlIxgoh3DqeXqyQbl+Ky8VK551L9B5PLFb40X2eWKyf3RVrxUpFrMU36KVihbKV88pCKtarfjzlWlpSsepWvh1RPZbr3JVi1SPLObSUYlkri1g7ZpZDGau6zGI3PJWxjKHV+3gqv6NSsXxX8KkqoxWrXFq98R7rkaYVq6jVaxWMpScWK6vVPW9rqKnF2r5e71e6G6G5+vRifZ9zjHFwyZDM9acYayx7PHEOeWIZ4pI5ViGxatW16/UFYlUfsy/HiFUx7iC3oxCrZDx73oc8sQrRarUNeWLlrKepx5AnVqbZaq0lHytmd3/tVu8jqccK2VuMjfA65NVjLdf3mBvhKYjHStuaWTU2wkst6Vj71+64MBiTjXV+7cL2dmK1XJdS+W9i5bI2qfoJsYpXy1rDEa8aq7ymitYPibWqr6nWIT+spRjL+sJNbYmCsexR3n5FOpYdYmZL1IvVmkxrif6WKBerPcXHW6JarN7SGW6JYrH6Q2m0JYrF6rYabolasQatRluiVKzJG5rmXFOKNXhyvOpuiUKxJh4rLP0tUSfW3JPj7ddm1GNNtuptiTKxxsN9194SVWLNDPesifUBkVhzw33X2hI1Ys0O911jS9SI5WzVukuUiDU/3A/vj1XrUSHWjVb2/44JxPJshEWYl/GzJzpieYf7ztgSHx/rbitrS3x8rDsDa7MeJ+0UYn2K9i+zOT09Fn8ueNbCH6Ked3+utxGLWMQCAAAAAAAAAAAAAAAAAAAAAAD4//0BUyATTom0AxcAAAAASUVORK5CYII="
                                }
                                width={100}
                                height={100}
                                alt={"image"}
                              />
                            </td>
                            <td className="px-4 py-3">{article.category}</td>
                            <td className="px-4 py-3">{article.source}</td>
                            <td className="px-4 py-3 max-w-[12rem] truncate">
                              {article.description}
                            </td>
                            <td className="px-4 py-3">
                              {article.published_at}
                            </td>
                            <td className="px-4 py-3 flex items-center justify-end">
                              <div
                                id="benq-ex2710q-dropdown"
                                className="z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                              >
                                <ul
                                  className="py-1 text-sm"
                                  aria-labelledby="benq-ex2710q-dropdown-button"
                                >
                                  <li>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setArticle(article);
                                        setIsUpdateOpen(true);
                                      }}
                                      data-modal-target="updateProductModal"
                                      data-modal-toggle="updateProductModal"
                                      className="flex w-full items-center py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-gray-700 dark:text-gray-200"
                                    >
                                      <svg
                                        className="w-4 h-4 mr-2"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        aria-hidden="true"
                                      >
                                        <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                                        <path
                                          fillRule="evenodd"
                                          clipRule="evenodd"
                                          d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                                        />
                                      </svg>
                                      Edit
                                    </button>
                                  </li>

                                  <li>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setArticle(article);
                                        setIsDeleteOpen(true);
                                      }}
                                      data-modal-target="deleteModal"
                                      data-modal-toggle="deleteModal"
                                      className="flex w-full items-center py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 text-red-500 dark:hover:text-red-400"
                                    >
                                      <svg
                                        className="w-4 h-4 mr-2"
                                        viewBox="0 0 14 15"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        aria-hidden="true"
                                      >
                                        <path
                                          fillRule="evenodd"
                                          clipRule="evenodd"
                                          fill="currentColor"
                                          d="M6.09922 0.300781C5.93212 0.30087 5.76835 0.347476 5.62625 0.435378C5.48414 0.523281 5.36931 0.649009 5.29462 0.798481L4.64302 2.10078H1.59922C1.36052 2.10078 1.13161 2.1956 0.962823 2.36439C0.79404 2.53317 0.699219 2.76209 0.699219 3.00078C0.699219 3.23948 0.79404 3.46839 0.962823 3.63718C1.13161 3.80596 1.36052 3.90078 1.59922 3.90078V12.9008C1.59922 13.3782 1.78886 13.836 2.12643 14.1736C2.46399 14.5111 2.92183 14.7008 3.39922 14.7008H10.5992C11.0766 14.7008 11.5344 14.5111 11.872 14.1736C12.2096 13.836 12.3992 13.3782 12.3992 12.9008V3.90078C12.6379 3.90078 12.8668 3.80596 13.0356 3.63718C13.2044 3.46839 13.2992 3.23948 13.2992 3.00078C13.2992 2.76209 13.2044 2.53317 13.0356 2.36439C12.8668 2.1956 12.6379 2.10078 12.3992 2.10078H9.35542L8.70382 0.798481C8.62913 0.649009 8.5143 0.523281 8.37219 0.435378C8.23009 0.347476 8.06631 0.30087 7.89922 0.300781H6.09922ZM4.29922 5.70078C4.29922 5.46209 4.39404 5.23317 4.56282 5.06439C4.73161 4.8956 4.96052 4.80078 5.19922 4.80078C5.43791 4.80078 5.66683 4.8956 5.83561 5.06439C6.0044 5.23317 6.09922 5.46209 6.09922 5.70078V11.1008C6.09922 11.3395 6.0044 11.5684 5.83561 11.7372C5.66683 11.906 5.43791 12.0008 5.19922 12.0008C4.96052 12.0008 4.73161 11.906 4.56282 11.7372C4.39404 11.5684 4.29922 11.3395 4.29922 11.1008V5.70078ZM8.79922 4.80078C8.56052 4.80078 8.33161 4.8956 8.16282 5.06439C7.99404 5.23317 7.89922 5.46209 7.89922 5.70078V11.1008C7.89922 11.3395 7.99404 11.5684 8.16282 11.7372C8.33161 11.906 8.56052 12.0008 8.79922 12.0008C9.03791 12.0008 9.26683 11.906 9.43561 11.7372C9.6044 11.5684 9.69922 11.3395 9.69922 11.1008V5.70078C9.69922 5.46209 9.6044 5.23317 9.43561 5.06439C9.26683 4.8956 9.03791 4.80078 8.79922 4.80078Z"
                                        />
                                      </svg>
                                      Delete
                                    </button>
                                  </li>
                                </ul>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
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

        {/* <!-- Modal --> */}
        {isCreateOpen && (
          <ModalCreate closeModal={closeCreateModal}></ModalCreate>
        )}

        {isUpdateOpen && article && (
          <ModalUpdate article={article} closeModal={closeModal}></ModalUpdate>
        )}
        {isDeleteOpen && article && (
          <ModalDelete
            article={article}
            closeModal={closeDeleteModal}
          ></ModalDelete>
        )}
      </div>
    </>
  );
};

export default Admin;
