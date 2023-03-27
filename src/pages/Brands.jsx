import { useEffect } from "react";
import { useSelector } from "react-redux";
import useStockCall from "../hooks/useStockCall";
import BrandCard from "../components/BrandCard";
import { Button, Grid, Typography } from "@mui/material";
import { flex } from "../styles/globalStyle";

const Brands = () => {
  const { getStockData } = useStockCall();
  const { brands } = useSelector((state) => state.stock);

  useEffect(() => {
    getStockData("brands");
  }, []);

  console.log(brands);

  return (
    <div>
      <Typography variant="h4" color="error" mb={3}>
        Brand
      </Typography>

      <Button variant="contained">New Brand</Button>

      <Grid container sx={flex}>
        {brands?.map((brand) => (
          <Grid item key={brand.id}>
            <BrandCard key={brand.id} brand={brand} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Brands;