import { FlatList, Image, Text, View, ActivityIndicator, Alert, TouchableOpacity, Dimensions } from "react-native";
import { styles } from "./styles";
// BackArrowIcon removed since MerchantNavbar already includes it
import MerchantNavbar from "../../../../components/navBar/MerchantNavbar";
import CustomInput from "../../../../components/customInput/CustomInput";
import CategoryFlatList from "../../../../components/categoryFlatList/CategoryFlatList";
import { Images, Metrix } from "../../../../config";
import { AdsLocationIcon, AdsStickerIcon } from "../../../../assets/svg";
import { useCallback, useEffect, useState } from "react";
import ApiCaller from "../../../../config/ApiCaller";
import { useFocusEffect } from "@react-navigation/native";

// Fallback image for ads without images
const fallbackImage = Images.homePopularListing;

export default function MerchantAds() {
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

            // Add status filter for active ads only
            params.push(`status=ACTIVE`);

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

                // Ensure newAds is an array
                const safeNewAds = Array.isArray(newAds) ? newAds : [];

                if (isLoadMore) {
                    setAds(prevAds => [...prevAds, ...safeNewAds]);
                } else {
                    setAds(safeNewAds);
                }

                setPagination(newPagination || {});
                console.log('Ads set:', safeNewAds.length, 'ads, Page:', newPagination?.currentPage);
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

    console.log("MerchantAds==>>", ads)

    const formatAdsData = (data, columns) => {
        // Ensure data is an array
        const safeData = Array.isArray(data) ? data : [];
        const numberOfFullRows = Math.floor(safeData.length / columns);
        let numberOfElementsLastRow = safeData.length - numberOfFullRows * columns;

        while (numberOfElementsLastRow !== 0 && numberOfElementsLastRow !== columns) {
            safeData.push({ id: `blank-${numberOfElementsLastRow}`, empty: true });
            numberOfElementsLastRow++;
        }

        return safeData;
    };

    const formattedAds = formatAdsData([...(ads || [])], 3);

    const renderAdsData = ({ item }) => {
        // Safety check for undefined item
        if (!item) {
            return null;
        }
        
        // Use API image or fallback
        const imageSource = item.images ? { uri: item.images } : fallbackImage;
      
        if (item.empty) {
            return <View style={{ flex: 1, margin: 5 }} />; // Invisible placeholder
        }
        
        return (
            <View style={[styles.adsDataContainer, { width: itemWidth }]}>
                <View style={{ padding: Metrix.VerticalSize(5) }}>
                    <Image source={imageSource} style={styles.image} />

                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
                    <Text style={styles.description} numberOfLines={2}>{item.description}</Text>
                    <View style={styles.locationContainer}>
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                            <View style={{ flexDirection: "row", alignItems: "center", gap: Metrix.HorizontalSize(5) }}>
                                <AdsLocationIcon />
                                <Text style={styles.locationText} numberOfLines={1}>Markham On</Text>
                            </View>
                            <AdsStickerIcon width={17} height={17} />
                        </View>
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
                <MerchantNavbar title={"Merchant Ads"} />
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
            {loading && (!ads || ads.length === 0) ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#003034" />
                    <Text style={styles.loadingText}>Loading ads...</Text>
                </View>
            ) : (ads || []).length > 0 ? (
                <FlatList
                    data={ads || []}
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
