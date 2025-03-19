import React, { useState, useEffect } from "react";
import { View, Text, Image, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Fonts, Images, Metrix } from "../../../config";
import styles from "./styles";
import colors from "../../../config/Colors";
import NavBar from "../../../components/navBar/NavBar";
import CustomInput from "../../../components/customInput/CustomInput";
import CategoryFlatList from "../../../components/categoryFlatList/CategoryFlatList";
import { useSelector } from "react-redux";
import axiosInstance from '../../../config/axios';
import { useFocusEffect } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { BlackBitIcon, CashIcon, CategoryMobileIcon, HomeLogo } from "../../../assets/svg";

const popularListings = [
    { id: "1", title: "Single Bed", location: "First Floor Maya Apartments", price: "8.5", image: Images.homePopularListing, bit: true, dollarLogo: false },
    { id: "2", title: "7 Seater Sofa Set", location: "7 seater sofa set 10/10", price: "450", image: Images.homePopularListing, bit: false, dollarLogo: true },
    { id: "3", title: "Audi A6", location: "4th (C7) Generation 2016 1.8 TFSI for Sale", price: "1850", image: Images.homePopularListing, bit: false, dollarLogo: true },
];

const myPosts = [
    { id: 1, post: "Single bed in Toronto" },
    { id: 2, post: "Audi A6 in Toronto" },
    { id: 3, post: "Sofa Set in Toronto" }
];

const ItemsTabScreen = () => {
    const navigation = useNavigation();
    const { user } = useSelector((state) => state.login);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get('/api/products');
            if (response.data) {
                setProducts(response.data);
                setError(null);
            }
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Failed to fetch products';
            setError(errorMessage);
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: errorMessage,
            });
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            fetchProducts();
            return () => {
                // Cleanup if needed
            };
        }, [])
    );

    console.log(products);

    const ListHeaderComponent = () => (
        <>
            <View style={styles.header}>
                <HomeLogo />
            </View>

            {user ? (
                <View style={{ paddingHorizontal: Metrix.HorizontalSize(15) }}>
                    <NavBar title={"SG Marketplace"} />
                </View>
            ) : (
                <View style={styles.address}>
                    <Image source={Images.homeLocation} style={styles.locationLogo} />
                    <View>
                        <Text style={{ fontSize: Metrix.FontRegular, fontFamily: Fonts.InterBold }}>Maya Appartments</Text>
                        <Text style={{ fontSize: Metrix.FontExtraSmall }}>2132 Halsey Avenue, Toronto</Text>
                    </View>
                </View>
            )}

            <View style={{ marginTop: Metrix.VerticalSize(20) }}>
                <CustomInput
                    justifyContent={'space-around'}
                    iconCondition={true}
                    placeholder={"Search items near you"}
                    borderRadius={Metrix.VerticalSize(3)}
                />
            </View>

            <View style={styles.categoryContainer}>
                <View style={{ marginTop: Metrix.VerticalSize(15) }}>
                    <CategoryFlatList />
                </View>
            
            </View>
        </>
    );

    const renderProduct = ({ item }) => (
        <TouchableOpacity
            activeOpacity={0.8}
            style={styles.productContainer}
            onPress={() => navigation.navigate('ProductDetail', { item })}
        >
            <Image
                source={item.images ? { uri: item.images.split(',')[0] } : Images.homePopularListing}
                style={styles.productImage}
            />
            <Text style={styles.productTitle} numberOfLines={1}>{item.title}</Text>
            <Text style={styles.productDescription} numberOfLines={2}>{item.description}</Text>
            <View style={styles.priceContainer}>
                {item.isSGPoints ? (
                    <>
                        <BlackBitIcon />
                        <Text style={styles.priceText}>{item.minBid}</Text>
                    </>
                ) : (
                    <>
                        <CashIcon />
                        <Text style={styles.priceText}>{item.price}</Text>
                    </>
                )}
            </View>
        </TouchableOpacity>
    );

    if (loading) {
        return (
            <View style={styles.container}>
                <ListHeaderComponent />
                <ActivityIndicator size="large" color={colors.buttonColor} style={styles.loader} />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.container}>
                <ListHeaderComponent />
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={products}
                renderItem={renderProduct}
                keyExtractor={(item) => item.id}
                numColumns={3}
                columnWrapperStyle={styles.productRow}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.productList}
                ListHeaderComponent={ListHeaderComponent}
                onRefresh={fetchProducts}
                refreshing={loading}
            />
        </View>
    );
};

export default ItemsTabScreen;