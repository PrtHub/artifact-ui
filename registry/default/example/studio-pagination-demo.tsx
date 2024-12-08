"use client";

import React, { useState } from "react";
import StudioPagination from "@/registry/default/ui-canvas/studio-pagination";

export default function StudioPaginationDemo() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const handlePageChange = async (page: number) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setCurrentPage(page);
    setIsLoading(false);
  };

  return (
    <div className="z-30 flex flex-col gap-8">
      {/* Variants */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Variants</h3>
        <div className="flex flex-col gap-4">
          <StudioPagination
            totalPages={10}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            variant="default"
            className="w-fit"
          />
          <StudioPagination
            totalPages={10}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            variant="outline"
            className="w-fit"
          />
          <StudioPagination
            totalPages={10}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            variant="ghost"
            className="w-fit"
          />
          <StudioPagination
            totalPages={10}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            variant="minimal"
            className="w-fit"
          />
          <StudioPagination
            totalPages={10}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            variant="gradient"
            className="w-fit"
          />
        </div>
      </div>

      {/* Animations */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Animations</h3>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <span className="w-20 text-sm text-muted-foreground">Fade:</span>
            <StudioPagination
              totalPages={10}
              currentPage={currentPage}
              onPageChange={handlePageChange}
              animation="fade"
              className="w-fit"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="w-20 text-sm text-muted-foreground">Slide:</span>
            <StudioPagination
              totalPages={10}
              currentPage={currentPage}
              onPageChange={handlePageChange}
              animation="slide"
              className="w-fit"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="w-20 text-sm text-muted-foreground">Scale:</span>
            <StudioPagination
              totalPages={10}
              currentPage={currentPage}
              onPageChange={handlePageChange}
              animation="scale"
              className="w-fit"
            />
          </div>
        </div>
      </div>

      {/* Interactive Features */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Interactive Features</h3>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <span className="w-32 text-sm text-muted-foreground">
              With Progress:
            </span>
            <StudioPagination
              totalPages={10}
              currentPage={currentPage}
              onPageChange={handlePageChange}
              showProgress
              className="w-fit"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="w-32 text-sm text-muted-foreground">
              Keyboard (←/→):
            </span>
            <StudioPagination
              totalPages={10}
              currentPage={currentPage}
              onPageChange={handlePageChange}
              enableKeyboard
              className="w-fit"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="w-32 text-sm text-muted-foreground">
              Swipe & Wheel:
            </span>
            <StudioPagination
              totalPages={10}
              currentPage={currentPage}
              onPageChange={handlePageChange}
              enableSwipe
              enableMouseWheel
              className="w-fit"
            />
          </div>
        </div>
      </div>

      {/* Custom Colors */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Custom Colors</h3>
        <div className="flex flex-col gap-4">
          <StudioPagination
            totalPages={10}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            customColors={{
              active: "bg-blue-500 hover:bg-blue-600",
              hover: "hover:bg-blue-100",
              text: "text-blue-600",
            }}
            className="w-fit"
          />
          <StudioPagination
            totalPages={10}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            customColors={{
              active: "bg-purple-500 hover:bg-purple-600",
              hover: "hover:bg-purple-100",
              text: "text-purple-600",
            }}
            className="w-fit"
          />
          <StudioPagination
            totalPages={10}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            customColors={{
              active: "bg-green-500 hover:bg-green-600",
              hover: "hover:bg-green-100",
              text: "text-green-600",
            }}
            className="w-fit"
          />
        </div>
      </div>

      {/* Advanced Combinations */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Advanced Combinations</h3>
        <div className="flex flex-col gap-4">
          <StudioPagination
            totalPages={10}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            variant="gradient"
            shape="pill"
            size="lg"
            animation="scale"
            showProgress
            enableKeyboard
            enableSwipe
            enableMouseWheel
            className="w-fit"
          />
          <StudioPagination
            totalPages={10}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            variant="minimal"
            shape="square"
            size="sm"
            animation="slide"
            customColors={{
              active: "bg-pink-500 hover:bg-pink-600",
              hover: "hover:bg-pink-100",
              text: "text-pink-600",
            }}
            className="w-fit"
          />
        </div>
      </div>

      {/* Loading State */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Loading State</h3>
        <StudioPagination
          totalPages={10}
          currentPage={1}
          isLoading={true}
          showProgress
          className="w-fit"
        />
      </div>
    </div>
  );
}
