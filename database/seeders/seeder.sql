-- CATEGORÍAS
INSERT INTO categorias (nombre, descripcion) VALUES
('bebidas', 'Productos de la categoría bebidas'),
('dulces', 'Productos de la categoría dulces'),
('chocolates', 'Productos de la categoría chocolates'),
('bizcochos', 'Productos de la categoría bizcochos');

-- PRODUCTOS
INSERT INTO productos (nombre, descripcion, imagen, precio, stock, categoria_id, fecha_creacion) VALUES
('Bebida coreana uva roja Hello Kitty', 'Figura sorpresa Sanrio, 220 ml', 'https://via.placeholder.com/300x300?text=uva-roja', 2.99, 30, 1, NOW()),
('Refresco Ramune uva (3 diseños Alea Sanrio)', 'Botella 330 ml, edición limitada', 'https://via.placeholder.com/300x300?text=ramune-uva', 3.50, 30, 1, NOW()),
('Refresco Crystal Chanmery uva (Pokémon Edit)', 'Lata 360 ml, edición Pokémon', 'https://via.placeholder.com/300x300?text=chanmery-uva', 3.20, 30, 1, NOW()),
('Té verde tostado edición limitada Rilakkuma', 'Botella 500 ml, edición Rilakkuma', 'https://via.placeholder.com/300x300?text=te-verde-rilakkuma', 2.80, 30, 1, NOW()),
('Refresco Crystal Chanmery uva (Doraemon Edit)', 'Lata 360 ml, edición Doraemon', 'https://via.placeholder.com/300x300?text=chanmery-doraemon', 3.20, 30, 1, NOW()),
('Refresco Clear Ocean Bomb miel-limón (One Piece Zoro)', 'Botella 330 ml, edición Zoro', 'https://via.placeholder.com/300x300?text=clear-ocean-zoro', 3.50, 30, 1, NOW()),
('Refresco Ramune mochi-limón (3 diseños Alea Kuromi)', 'Botella 330 ml, edición Kuromi', 'https://via.placeholder.com/300x300?text=ramune-mochi', 3.50, 30, 1, NOW()),
('Bebida Bubble manzana + bobas Aloe Vera Hello Kitty', 'Botella 310 ml, edición Hello Kitty', 'https://via.placeholder.com/300x300?text=bubble-manzana', 4.00, 30, 1, NOW()),

('Trío chuches kawaii Outlet Menu Sakura', 'Pack surtido de chuches japonés', 'https://via.placeholder.com/300x300?text=trio-chuches', 5.99, 30, 2, NOW()),
('Caramelo coreano Shin-Chan (20 escenas acrílicas)', '20 escenas aleatorias de Shin-Chan', 'https://via.placeholder.com/300x300?text=caramelo-shinchan', 3.50, 30, 2, NOW()),
('Galletas snack Chocobi Shin-Chan', 'Top ventas, paquete 30g', 'https://via.placeholder.com/300x300?text=chocobi', 2.20, 30, 2, NOW()),
('Doraemon barquillo mousse chocolate+nata', 'Unidad 19g', 'https://via.placeholder.com/300x300?text=doraemon-barquillo', 2.00, 30, 2, NOW()),
('Algodón azúcar arcoíris (6 sabores Kirby)', 'Paquete 12g', 'https://via.placeholder.com/300x300?text=algodon-kirby', 3.99, 30, 2, NOW()),
('Algodón azúcar arcoíris (5 diseños + sticker Pokémon)', 'Paquete 9g', 'https://via.placeholder.com/300x300?text=algodon-pokemon', 3.50, 30, 2, NOW()),
('Chuches 4D Shin-Chan sabor Ramune', 'Paquete 60g', 'https://via.placeholder.com/300x300?text=4d-shinchan', 3.00, 30, 2, NOW()),
('Caramelos coreanos xilitol puro Hello Kitty Friends', 'Paquete 40g', 'https://via.placeholder.com/300x300?text=xilitol-hello-kitty', 4.50, 30, 2, NOW()),
('Caramelo coreano Pokémon (16 escenas)', 'Edición aleatoria Nintendo', 'https://via.placeholder.com/300x300?text=caramelo-pokemon', 3.80, 30, 2, NOW()),
('Mini Dorayakis Mogu Mogu Azuki', 'Paquete 170g', 'https://via.placeholder.com/300x300?text=mini-dorayakis', 5.20, 30, 2, NOW()),

('Bocados Brownie & Cookies & Cream Kuromi', 'Paquete 40g', 'https://via.placeholder.com/300x300?text=brownie-kuromi', 3.50, 30, 3, NOW()),
('Bombones bellota hojaldre & almendra Bosque Mágico', 'Paquete 81g', 'https://via.placeholder.com/300x300?text=bombones-bellota', 4.80, 30, 3, NOW()),
('Galleta chocolate rellena crema té matcha', 'Unidad', 'https://via.placeholder.com/300x300?text=galleta-matcha', 2.00, 30, 3, NOW()),
('Bombones fresa & chocolate Hello Kitty PekoChan', 'Edición Sanrio Friends', 'https://via.placeholder.com/300x300?text=bombones-hello-kitty', 5.00, 30, 3, NOW()),
('Chocolatina puzzle 4 sabores (Hello Kitty)', '8 diseños aleatorios, 29g', 'https://via.placeholder.com/300x300?text=puzzle-hello-kitty', 3.00, 30, 3, NOW()),
('Chocolatina puzzle 4 sabores (Pokémon)', '8 diseños aleatorios, 31g', 'https://via.placeholder.com/300x300?text=puzzle-pokemon', 3.00, 30, 3, NOW()),

('Bizcocho frambuesa relleno chocolate Dairy Sweets', 'Paquete 55g', 'https://via.placeholder.com/300x300?text=bizcocho-frambuesa', 3.50, 30, 4, NOW()),
('Bizcochito relleno manzana confitada Dairy Sweets', 'Paquete 60g', 'https://via.placeholder.com/300x300?text=bizcochito-manzana', 3.80, 30, 4, NOW()),
('Choco Pie matcha nube cremosa Family Box', '12 unidades', 'https://via.placeholder.com/300x300?text=choco-pie-matcha', 6.50, 30, 4, NOW()),
('Cake Roll choco crema & mermelada frambuesa', 'Paquete 35g', 'https://via.placeholder.com/300x300?text=cake-roll-frambuesa', 2.80, 30, 4, NOW()),
('Cake Roll mil capas chocolate', 'Paquete 50g', 'https://via.placeholder.com/300x300?text=cake-roll-chocolate', 3.20, 30, 4, NOW()),
('Mochis kinako & chocolate Lotte', 'Paquete 180g', 'https://via.placeholder.com/300x300?text=mochis-kinako', 5.50, 30, 4, NOW()),
('Mochis tradicionales salty azuki', 'Paquete 130g', 'https://via.placeholder.com/300x300?text=mochis-salty-azuki', 4.80, 30, 4, NOW());

-- USUARIOS DE PRUEBA
INSERT INTO usuarios (nombre, email, telefono, contraseña, tipo) VALUES
('Admin', 'admin@dulces.com', '666666666', 'admin123', 'admin'),
('Cliente de prueba', 'cliente@dulces.com', '666111111', 'cliente123', 'cliente');

-- DIRECCIÓN DE ENVÍO DE PRUEBA
INSERT INTO direcciones_envio (usuario_id, calle, ciudad, codigo_postal, pais) VALUES
(2, 'Calle Prueba 123', 'Madrid', '28001', 'España');

-- MÉTODOS DE PAGO
INSERT INTO metodos_pago (nombre, descripcion) VALUES
('Tarjeta de crédito', 'Pago seguro con tarjeta'),
('PayPal', 'Paga cómodamente con tu cuenta PayPal'),
('Transferencia bancaria', 'Transferencia directa a nuestra cuenta');
