import { clsx, type ClassValue } from "clsx"
import { toast } from "sonner";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function handleApiError(error: any) {
  // Handle 422 validation errors
  if (error?.status === 422 && error?.data) {
    const errorMessages = Object.entries(error.data)
      .map(([field, messages]) => {
        const formattedField = field
          .split('_')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');

        return `${formattedField}: ${Array.isArray(messages) ? messages.join(', ') : messages
          }`;
      })
      .join('\n');

    toast.error('Validation Error', {
      description: errorMessages,
    });
  } else {
    const fallbackMessage =
      error?.data?.error ||
      error?.message ||
      'An unexpected error occurred. Please try again.';
    toast.error(fallbackMessage);
  }
}
