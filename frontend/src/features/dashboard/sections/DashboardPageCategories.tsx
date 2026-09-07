import { Layers, Plus } from "lucide-react";
import { SectionTitle } from "../components/SectionTitle";
import { dasboardCtegories } from "../data/demoDashboard";
import { Button, Card, Typography } from "@mui/material";

export const DashboardPageCategories = () => {
  return (
    <div>
      <SectionTitle
        title="دسته‌بندی‌ها"
        icon={<Layers size={20} className="text-gray-500" />}
        count={5}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-4">
        <Button className="flex items-center justify-center h-30 bg-gray-200/50!">
          <Typography
            variant="h6"
            className="text-lg! flex items-center"
            color="textDisabled"
          >
            {" "}
            <Plus size={20} /> دسته‌بندی‌
          </Typography>
        </Button>
        {dasboardCtegories.menu_categories.map((category) => (
          <Card
            key={category.id}
            className={`flex items-center gap-2 p-4 h-30 bg-[${category.style.background_color}]!`}
            elevation={3}
          >
            <Typography
              variant="h6"
              className="text-lg! flex items-center text-white!"
            >
              {category.title}
            </Typography>
            <span className=" py-1 px-2 flex items-center justify-center rounded-full bg-black/50 text-white text-sm">
              <p>{category.count} عدد</p>
            </span>
          </Card>
        ))}
      </div>
    </div>
  );
};
