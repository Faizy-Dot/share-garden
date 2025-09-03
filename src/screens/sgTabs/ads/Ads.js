import { FlatList, Image, Text, View, ActivityIndicator, Alert, TouchableOpacity, Dimensions, TextInput } from "react-native";
import { styles } from "./styles";
import BackArrowIcon from "../../../components/backArrowIcon/BackArrowIcon";
import NavBar from "../../../components/navBar/NavBar";
import CategoryFlatList from "../../../components/categoryFlatList/CategoryFlatList";
import { Images, Metrix } from "../../../config";
// Remove KeyboardAwareScrollView import since we're using FlatList
import { AdsLocationIcon, AdsStickerIcon, CrossIcon } from "../../../assets/svg";
import { useCallback, useEffect, useState, useRef } from "react";
import ApiCaller from "../../../config/ApiCaller";
import { useFocusEffect } from "@react-navigation/native";



// Fallback image for ads without images
const fallbackImage = Images.homePopularListing;


export default function AdsTabScreen() {
    const screenWidth = Dimensions.get('window').width;
    const itemWidth = (screenWidth - Metrix.HorizontalSize(45)) / 3; // 3 items per row with margins

    const [loading, setLoading] = useState(false)
    const [ads, setAds] = useState([])
    const [searchResults, setSearchResults] = useState(null)
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
    const [searchText, setSearchText] = useState('')
    const searchInputRef = useRef(null)
    const searchTimeoutRef = useRef(null)

    const fetchAds = async (categoryId = null, page = 1, isLoadMore = false) => {
        if (!isLoadMore) {
            setLoading(true);
        }
        
        try {
            console.log('Fetching ads...', { categoryId, page });
            
            // Build query parameters
            let url = '/api/ads';
            const params = [];
            
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

    const performSearch = async (query) => {
        try {
            console.log('Searching ads...', { query });
            
            // Build search query parameters
            let url = '/api/ads';
            const params = [];
            
            if (query && query.trim()) {
                params.push(`search=${encodeURIComponent(query.trim())}`);
            }
            
            if (selectedCategory) {
                params.push(`categoryId=${selectedCategory}`);
            }
            
            // Add status filter for active ads only
            params.push(`status=ACTIVE`);
            
            // Add pagination parameters
            params.push(`page=1`);
            params.push(`limit=${pagination.limit}`);
            
            if (params.length > 0) {
                url += '?' + params.join('&');
            }
            
            console.log('Search API URL:', url);
            const response = await ApiCaller.Get(url);
            console.log('Search response:', response);
            
            if (response.data) {
                const { ads: searchAds } = response.data;
                setSearchResults(searchAds);
                console.log('Search results set:', searchAds.length, 'ads');
            } else {
                setSearchResults([]);
            }
        } catch (error) {
            console.error('Error searching ads:', error);
            setSearchResults([]);
        }
    };

    const debouncedSearch = (query) => {
        // Clear existing timeout
        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
        }
        
        // Set new timeout for debounced search
        searchTimeoutRef.current = setTimeout(() => {
            if (query && query.trim()) {
                performSearch(query);
            } else {
                setSearchResults(null);
            }
        }, 500); // 500ms delay
    };




    useFocusEffect(
        useCallback(() => {
            fetchAds(selectedCategory, 1, false);
        }, [selectedCategory])
    );

    // Cleanup timeout on unmount
    useEffect(() => {
        return () => {
            if (searchTimeoutRef.current) {
                clearTimeout(searchTimeoutRef.current);
            }
        };
    }, []);

    // Handle category selection
    const handleCategorySelect = (category) => {
        setSelectedCategory(category?.id || null);
    };

    // Clear all filters
    const clearFilters = () => {
        // Clear search timeout
        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
        }
        
        setSearchText('');
        if (searchInputRef.current?.clear) {
            searchInputRef.current.clear();
        }
        setSearchResults(null);
        setSelectedCategory(null);
        fetchAds(null, 1, false);
    };

    // Clear only category filter
    const clearCategoryFilter = () => {
        setSelectedCategory(null);
        fetchAds(null, 1, false);
    };



    // Load more ads
    const loadMoreAds = () => {
        if (pagination.hasNextPage && !loading) {
            if (searchResults) {
                // If showing search results, don't load more
                return;
            }
            fetchAds(selectedCategory, pagination.currentPage + 1, true);
        }
    };

    // Refresh ads
    const onRefresh = () => {
        setRefreshing(true);
        if (searchResults) {
            // If showing search results, refresh search
            if (searchInputRef.current) {
                performSearch(searchInputRef.current);
            } else {
                setSearchResults(null);
                fetchAds(selectedCategory, 1, false);
            }
        } else {
            fetchAds(selectedCategory, 1, false);
        }
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



    return (
        <View style={styles.adsContainer}>
            {/* Fixed Header with Search */}
            <View style={styles.topContainer}>
                <View>
                    <BackArrowIcon />
                </View>

                <View>
                    <NavBar title={"Merchant Ads"} />
                </View>

                <View style={styles.searchInputContainer}>
                    <View style={{flex : 1 , justifyContent : "center"}}>
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search ads..."
                            placeholderTextColor="#999"
                            value={searchText}
                            onChangeText={(text) => {
                                setSearchText(text);
                                debouncedSearch(text);
                            }}
                        />
                        <TouchableOpacity
                            onPress={() => {
                                // Clear search timeout
                                if (searchTimeoutRef.current) {
                                    clearTimeout(searchTimeoutRef.current);
                                }
                                
                                setSearchText('');
                                if (searchInputRef.current?.clear) {
                                    searchInputRef.current.clear();
                                }
                                setSearchResults(null);
                                fetchAds(selectedCategory, 1, false);
                            }}
                            style={styles.clearButton}
                        >
                            <CrossIcon width={16} height={16} strokeColor="#999" />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ marginTop: Metrix.VerticalSize(10) }}>
                    <CategoryFlatList 
                        onCategorySelect={handleCategorySelect}
                        selectedCategory={selectedCategory}
                    />
                </View>

                {/* Clear Filter Button - Show only when there are active filters */}
                {(searchText || selectedCategory) && (
                    <View style={styles.clearFilterContainer}>
                        <TouchableOpacity onPress={clearFilters} style={styles.clearFilterButton}>
                            <Text style={styles.clearFilterText}>Clear All Filters</Text>
                        </TouchableOpacity>
                    </View>
                )}


            </View>

            {/* Content */}
            {loading && ads.length === 0 ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#003034" />
                    <Text style={styles.loadingText}>Loading ads...</Text>
                </View>
            ) : (searchResults || ads).length > 0 ? (
                <FlatList 
                    data={searchResults || ads}
                    keyExtractor={(item) => item.id}
                    renderItem={renderAdsData}
                    numColumns={3}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.adsDataStyle}
                    onEndReached={loadMoreAds}
                    onEndReachedThreshold={0.1}
                    ListFooterComponent={renderFooter}
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    columnWrapperStyle={styles.rowContainer}
                    keyboardShouldPersistTaps="handled"
                />
            ) : (
                <View style={styles.noAdsContainer}>
                    <Text style={styles.noAdsText}>
                        {searchResults || selectedCategory 
                            ? 'No ads found matching your search criteria.' 
                            : 'No ads available at the moment.'
                        }
                    </Text>

                </View>
            )}
        </View>
    )
}