import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const convertFileToUrl = (file: File) => URL.createObjectURL(file);

export function formatDateString(dateString: string) {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString("en-US", options);

  const time = date.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });

  return `${formattedDate} at ${time}`;
}

// 
export const multiFormatDateString = (timestamp: string = ""): string => {
  const timestampNum = Math.round(new Date(timestamp).getTime() / 1000);
  const date: Date = new Date(timestampNum * 1000);
  const now: Date = new Date();

  const diff: number = now.getTime() - date.getTime();
  const diffInSeconds: number = diff / 1000;
  const diffInMinutes: number = diffInSeconds / 60;
  const diffInHours: number = diffInMinutes / 60;
  const diffInDays: number = diffInHours / 24;

  switch (true) {
    case Math.floor(diffInDays) >= 30:
      return formatDateString(timestamp);
    case Math.floor(diffInDays) === 1:
      return `${Math.floor(diffInDays)} day ago`;
    case Math.floor(diffInDays) > 1 && diffInDays < 30:
      return `${Math.floor(diffInDays)} days ago`;
    case Math.floor(diffInHours) >= 1:
      return `${Math.floor(diffInHours)} hours ago`;
    case Math.floor(diffInMinutes) >= 1:
      return `${Math.floor(diffInMinutes)} minutes ago`;
    default:
      return "Just now";
  }
};

export const checkIsLiked = (likeList: string[], userId: string) => {
  return likeList.includes(userId);
};


// function formatRelativeTime(dateString: string): string {
//   const currentDate: Date = new Date();
//   const inputDate: Date = new Date(dateString);

//   const timeDifference: number = currentDate.getTime() - inputDate.getTime();
//   const seconds: number = Math.floor(timeDifference / 1000);
//   const minutes: number = Math.floor(seconds / 60);
//   const hours: number = Math.floor(minutes / 60);
//   const days: number = Math.floor(hours / 24);

//   if (days > 1) {
//     return `${days} days ago`;
//   } else if (days === 1) {
//     return '1 day ago';
//   } else if (hours > 1) {
//     return `${hours} hours ago`;
//   } else if (hours === 1) {
//     return '1 hour ago';
//   } else if (minutes > 1) {
//     return `${minutes} minutes ago`;
//   } else if (minutes === 1) {
//     return '1 minute ago';
//   } else {
//     return 'Just now';
//   }
// }
// @/lib/react-query/queriesandMutations"
// multiFormatDateString