import { ChevronLeft, Layers, Plus } from "lucide-react";
import { Button, Card, Link, Typography } from "@mui/material";

import { SectionTitle } from "../components/SectionTitle";
import { dashboardCategories } from "../data/demoDashboard";

export const DashboardPageCategories = () => {
  return (
    <section>
      <SectionTitle
        title="دسته‌بندی‌ها"
        icon={<Layers size={20} className="text-gray-500" />}
        count={dashboardCategories.menu_categories.length}
      >
        <Link
          href="/dashboard/categories"
          className="flex items-center gap-1 text-sm! text-blue-500 hover:underline hover:text-blue-600 transition-all"
        >
          مشاهده همه <ChevronLeft size={18} />
        </Link>
      </SectionTitle>

      <div className="grid grid-cols-1 gap-4 py-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Add Category */}
        <Button
          variant="contained"
          className="flex h-30! items-center justify-center"
          sx={{
            backgroundColor: "#F3F4F6",
            color: "#9CA3AF",
            boxShadow: "none",

            "&:hover": {
              backgroundColor: "#E5E7EB",
              boxShadow: "none",
            },
          }}
        >
          <Typography variant="h6" className="flex items-center gap-2 text-lg!">
            <Plus size={20} />
            دسته‌بندی جدید
          </Typography>
        </Button>

        {/* Categories */}
        {dashboardCategories.menu_categories.map((category) => (
          <Card
            key={category.id}
            elevation={3}
            className="flex h-30! items-center justify-between rounded-2xl! p-4"
            sx={{
              backgroundColor: category.style.background_color,
              color: category.style.text_color,
            }}
          >
            <Typography
              variant="h6"
              className="text-lg!"
              sx={{
                color: category.style.text_color,
              }}
            >
              {category.title}
            </Typography>

            <span className="rounded-full bg-black/20 px-3 py-1 text-sm text-white">
              {category.count} عدد
            </span>
          </Card>
        ))}
      </div>
    </section>
  );
};
