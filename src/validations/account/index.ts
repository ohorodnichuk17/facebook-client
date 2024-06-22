export const AvatarValidator = (files: File[]): string | undefined => {
   const maxSizeInBytes = 5 * 1024 * 1024;
   for (const file of files) {
      if (file.size > maxSizeInBytes) return 'File size must not exceed 2 MB';
   }
   return undefined;
};
