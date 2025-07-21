import { FlatList, Image, Text, View, ActivityIndicator, Alert, TouchableOpacity, Dimensions } from "react-native";
import { styles } from "./styles";
import BackArrowIcon from "../../../components/backArrowIcon/BackArrowIcon";
import NavBar from "../../../components/navBar/NavBar";
import CustomInput from "../../../components/customInput/CustomInput";
import CategoryFlatList from "../../../components/categoryFlatList/CategoryFlatList";
import { Images, Metrix } from "../../../config";
// Remove KeyboardAwareScrollView import since we're using FlatList
import { AdsLocationIcon, AdsStickerIcon } from "../../../assets/svg";
import { useCallback, useEffect, useState } from "react";
import ApiCaller from "../../../config/ApiCaller";
import { useFocusEffect } from "@react-navigation/native";



// Fallback image for ads without images
const fallbackImage = Images.homePopularListing;


export default function AdsTabScreen() {
    const screenWidth = Dimensions.get('window').width;
    const itemWidth = (screenWidth - Metrix.HorizontalSize(45)) / 3; // 3 items per row with margins

    const [loading, setLoading] = useState(false)
    const [ads, setAds] = useState([])
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalAds: 0,
        hasNextPage: false,
        hasPrevPage: false,
        limit: 12
    })
    const [refreshing, setRefreshing] = useState(false)

    const fetchAds = async (search = '', categoryId = null, page = 1, isLoadMore = false) => {
        if (!isLoadMore) {
            setLoading(true);
        }
        
        try {
            console.log('Fetching ads...', { search, categoryId, page });
            
            // Build query parameters
            let url = '/api/ads';
            const params = [];
            
            if (search && search.trim()) {
                params.push(`search=${encodeURIComponent(search.trim())}`);
            }
            
            if (categoryId) {
                params.push(`categoryId=${categoryId}`);
            }
            
            // Add pagination parameters
            params.push(`page=${page}`);
            params.push(`limit=${pagination.limit}`);
            
            if (params.length > 0) {
                url += '?' + params.join('&');
            }
            
            console.log('API URL:', url);
            const response = await ApiCaller.Get(url);
            console.log('Ads response:', response);
            
            if (response.data) {
                const { ads: newAds, pagination: newPagination } = response.data;
                
                if (isLoadMore) {
                    setAds(prevAds => [...prevAds, ...newAds]);
                } else {
                    setAds(newAds);
                }
                
                setPagination(newPagination);
                console.log('Ads set:', newAds.length, 'ads, Page:', newPagination.currentPage);
            } else {
                if (!isLoadMore) {
                    setAds([]);
                }
            }
        } catch (error) {
            console.error('Error fetching ads:', error);
            if (!isLoadMore) {
                Alert.alert('Error', 'Failed to load ads. Please try again.');
                setAds([]);
            }
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };


    useFocusEffect(
        useCallback(() => {
            fetchAds(searchQuery, selectedCategory, 1, false);
        }, [searchQuery, selectedCategory])
    );

    // Handle search input
    const handleSearch = (text) => {
        setSearchQuery(text);
    };

    // Handle category selection
    const handleCategorySelect = (category) => {
        setSelectedCategory(category?.id || null);
    };

    // Clear all filters
    const clearFilters = () => {
        setSearchQuery('');
        setSelectedCategory(null);
    };

    // Load more ads
    const loadMoreAds = () => {
        if (pagination.hasNextPage && !loading) {
            fetchAds(searchQuery, selectedCategory, pagination.currentPage + 1, true);
        }
    };

    // Refresh ads
    const onRefresh = () => {
        setRefreshing(true);
        fetchAds(searchQuery, selectedCategory, 1, false);
    };

    console.log("Ads==>>", ads)

    const renderAdsData = ({ item }) => {
        // Use API image or fallback
        const imageSource = item.images ? { uri: item.images } : fallbackImage;
        
        // Get merchant name
        const merchantName = item.merchant ? 
            `${item.merchant.firstName} ${item.merchant.lastName}` : 
            'Unknown Merchant';
        
        // Get category name
        const categoryName = item.category ? item.category.name : 'Uncategorized';
        
        return (
            <View style={[styles.adsDataContainer, { width: itemWidth }]}>
                <Image source={imageSource} style={styles.image} />
                <View style={styles.textContainer}>
                    <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
                    <Text style={styles.description} numberOfLines={2}>{item.description}</Text>
                    <View style={styles.locationContainer}>
                        <View style={{ flexDirection: "row", alignItems: "center", gap: Metrix.HorizontalSize(2) }}>
                            <AdsLocationIcon />
                            <Text style={styles.locationText} numberOfLines={1}>{merchantName}</Text>
                        </View>
                        <Text style={styles.categoryText} numberOfLines={1}>{categoryName}</Text>
                    </View>
                </View>
            </View>
        )
    }

    const renderFooter = () => {
        if (!pagination.hasNextPage) return null;
        
        return (
            <View style={styles.loadMoreContainer}>
                {loading ? (
                    <ActivityIndicator size="small" color="#003034" />
                ) : (
                    <TouchableOpacity style={styles.loadMoreButton} onPress={loadMoreAds}>
                        <Text style={styles.loadMoreText}>Load More</Text>
                    </TouchableOpacity>
                )}
            </View>
        );
    };

    const renderHeader = () => (
        <View style={styles.topContainer}>
            <View>
                <BackArrowIcon />
            </View>

            <View>
                <NavBar title={"Merchant Ads"} />
            </View>

            <View>
                <CustomInput 
                    iconCondition={true} 
                    justifyContent={"space-between"}
                    value={searchQuery}
                    onChangeText={handleSearch}
                    placeholder="Search ads..."
                />
            </View>

            <View style={{ marginTop: Metrix.VerticalSize(10) }}>
                <CategoryFlatList 
                    onCategorySelect={handleCategorySelect}
                    selectedCategory={selectedCategory}
                />
            </View>

            {/* Filter Status */}
            {(searchQuery || selectedCategory) && (
                <View style={styles.filterStatusContainer}>
                    <Text style={styles.filterStatusText}>
                        {searchQuery && `Search: "${searchQuery}"`}
                        {searchQuery && selectedCategory && ' • '}
                        {selectedCategory && `Category: ${selectedCategory}`}
                    </Text>
                    <TouchableOpacity onPress={clearFilters} style={styles.clearFiltersButton}>
                        <Text style={styles.clearFiltersText}>Clear</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );

    return (
        <View style={styles.adsContainer}>
            {loading && ads.length === 0 ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#003034" />
                    <Text style={styles.loadingText}>Loading ads...</Text>
                </View>
            ) : ads.length > 0 ? (
                <FlatList 
                    data={ads}
                    keyExtractor={(item) => item.id}
                    renderItem={renderAdsData}
                    numColumns={3}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.adsDataStyle}
                    onEndReached={loadMoreAds}
                    onEndReachedThreshold={0.1}
                    ListHeaderComponent={renderHeader}
                    ListFooterComponent={renderFooter}
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    columnWrapperStyle={styles.rowContainer}
                />
            ) : (
                <View style={styles.noAdsContainer}>
                    <Text style={styles.noAdsText}>
                        {searchQuery || selectedCategory 
                            ? 'No ads found matching your search criteria.' 
                            : 'No ads available at the moment.'
                        }
                    </Text>
                    {(searchQuery || selectedCategory) && (
                        <TouchableOpacity onPress={clearFilters} style={styles.clearFiltersButton}>
                            <Text style={styles.clearFiltersText}>Clear Filters</Text>
                        </TouchableOpacity>
                    )}
                </View>
            )}
        </View>
    )
}