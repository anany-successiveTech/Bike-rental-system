const getStatusStyle = (status) => {
  switch (status?.toLowerCase()) {
    case "confirmed":
      return "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300";
    case "pending":
      return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300";
    case "cancelled":
      return "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300";
    case "completed":
      return "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300";
    default:
      return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300";
  }
};
export default getStatusStyle;  