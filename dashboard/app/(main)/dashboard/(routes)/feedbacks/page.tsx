"use client";

import StarRating from "@/components/global/rating";
import { columns } from "@/components/tables/feedback-tables/column";
import { FeedbackTable } from "@/components/tables/feedback-tables/feedback-table";
import { Label } from "@/components/ui/label";
import { useFeedbacks } from "@/server/feedback/queries";

const FeedbacksPage = () => {
  const { data: feedbacks } = useFeedbacks();

  // Calculate the percentage of each star rating
  const calculatePercentage = (count: number, total: number) => {
    return total > 0 ? ((count / total) * 100).toFixed(2) : 0;
  };

  // Render each star rating row
  const renderStarRow = (star: string, count: number, total: number) => {
    const percentage = calculatePercentage(count, total);
    return (
      <div key={star} className="flex items-center mt-4">
        <a
          href="#"
          className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline"
        >
          {star} star
        </a>
        <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
          <div
            className="h-5 bg-yellow-300 rounded"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
          {percentage}%
        </span>
      </div>
    );
  };

  return (
    <div className="p-4">
      <Label className="text-4xl font-bold">Feedbacks</Label>
      <div className="flex space-y-2 mb-8 mt-4 border w-full p-4 shadow-md rounded-2xl">
        <div className="w-[80%]">
          {Object.keys(feedbacks?.ratingsCount || {}).map((star) =>
            renderStarRow(star, feedbacks.ratingsCount[star], feedbacks?.total),
          )}
        </div>
        <div className="flex flex-col justify-center items-center">
          <p className="text-4xl font-bold">{feedbacks?.averageRating}</p>
          <StarRating rating={feedbacks?.averageRating} showNum={false} />
          <p className="text-sm mt-2">({feedbacks?.total} feedbacks)</p>
        </div>
      </div>
      <FeedbackTable columns={columns} data={feedbacks?.feedbacks || []} />
    </div>
  );
};

export default FeedbacksPage;
