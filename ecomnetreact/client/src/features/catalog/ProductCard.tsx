import { LoadingButton } from '@mui/lab';
import { Avatar, Button, Card, CardActionArea, CardActions, CardContent, CardHeader, CardMedia, Typography } from '@mui/material'
import { Link } from 'react-router-dom';
import { Product } from '../../app/models/product';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import { currencyFormat } from '../../app/util/util';
import { addBasketItemAsync } from '../basket/basketSlice';

interface Props {
  product: Product;
}

const ProductCard = ({product}: Props) => {
  const { status } = useAppSelector(state => state.basket);
  const dispatch = useAppDispatch();

  return (
    <Card>
      <CardActionArea>
        <CardHeader 
          avatar={
            <Avatar sx={{bgcolor: 'secondary.main'}}>
              {product.name.charAt(0).toUpperCase()}
            </Avatar>
          }
          title={product.name}
          titleTypographyProps={{
            sx: {fontWeight: 'bold', color: 'primary.main'}
          }}
        />
        <CardMedia
          sx={{ 
            height: 140, 
            backgroundSize: 'contain', 
            bgcolor: 'primary.light' }}
          image={product.pictureUrl}
          title={product.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" color="secondary">
            {currencyFormat(product.price)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.brand} / {product.type}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <LoadingButton 
          loading={status === 'pendingAddItem' + product.id} 
          onClick={()=> dispatch(addBasketItemAsync({productId: product.id}))} 
          size="small" color="primary">Add to cart</LoadingButton>
        <Button 
          component={Link} 
          to={`/catalog/${product.id}`} 
          size="small"
        >
          View
        </Button>
      </CardActions>
    </Card>
  )
}

export default ProductCard