import { Box, Button, Card, Switch, Typography } from "@mui/material";
import { dashboardProducts } from "../../data/demoDashboard";
import { Eye, EyeOff, Package } from "lucide-react";

export default function ProductsPageProductsList() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {dashboardProducts.map((product) => (
        <Card key={product.id} elevation={1}>
          <div className="w-full h-50 bg-gray-200 text-gray-400 flex items-center justify-center relative p-2">
            <span className="absolute top-2 right-2 bg-white py-1 px-4 rounded-full">
              <Typography variant="body2" className="text-xs!">
                {product.category_name}
              </Typography>
            </span>
            <Package size={20} />
          </div>
          {/* main content */}
          <div className="p-2 flex flex-col gap-5">
            <span className="w-full flex items-center justify-between">
              <span>
                <Typography variant="body1" className="font-bold!">
                  {product.title}
                </Typography>
                <Typography variant="caption">{product.description}</Typography>
              </span>
              <Box className="shrink-0 rounded-lg bg-gray-100 px-3 py-1.5">
                <Typography
                  variant="body2"
                  className="whitespace-nowrap! font-bold!"
                >
                  {product.price.toLocaleString("fa-IR")} ت
                </Typography>
              </Box>
            </span>
            {/* Details */}
            <Box className="w-full grid grid-cols-2 border border-gray-300 rounded-2xl">
              {/* Visibility */}
              <Box className="flex items-center gap-2 bg-gray-50 p-1 rounded-r-2xl border-l border-gray-300 border-dashed">
                <Box className=" w-full text-center">
                  <Typography
                    variant="body2"
                    className={`
                        font-semibold!
                        ${
                          product.visible
                            ? "text-emerald-600!"
                            : "text-gray-500!"
                        }
                      `}
                  >
                    <Box
                      className={`
                          flex
                          justify-center
                          ${
                            product.visible
                              ? "text-emerald-600"
                              : "text-gray-400"
                          }
                          `}
                    >
                      {product.visible ? (
                        <Eye size={17} />
                      ) : (
                        <EyeOff size={17} />
                      )}
                    </Box>
                  </Typography>
                  <Typography
                    variant="caption"
                    className="block! text-gray-400!"
                  >
                    وضعیت
                  </Typography>
                </Box>
              </Box>

              {/* Stock */}
              <Box className="flex items-center gap-2 rounded-l-2xl bg-gray-50 p-1">
                <Box className=" w-full text-center">
                  <Typography
                    variant="body2"
                    className={`
                        font-semibold!
                        ${product.stock ? "text-emerald-600!" : "text-red-500!"}
                      `}
                  >
                    {product.stock ? "موجود" : "ناموجود"}
                  </Typography>
                  <Typography
                    variant="caption"
                    className="block! text-gray-400!"
                  >
                    موجودی
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box className="flex items-center justify-between gap-4">
              <Box className="min-w-0">
                <Typography variant="body2" className="font-bold!">
                  نمایش محصول
                </Typography>

                <Typography variant="caption" className="text-gray-500!">
                  دیده شدن محصول در منو
                </Typography>
              </Box>
              <Switch defaultChecked={product.visible} size="small" />
            </Box>
            <Button variant="text" fullWidth size="small">
              مشاهده
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}
