// File: frontend/components/ui/SpinnerLoading.tsx

import { ClipLoader } from "react-spinners";

export default function SpinnerLoading() {
  return (
    <div className="flex items-center justify-center min-h-[300px] ">
      <ClipLoader 
        size={40} 
        speedMultiplier={0.8} 
        color="var(--color-accent)" 
      />
    </div>
  );
}