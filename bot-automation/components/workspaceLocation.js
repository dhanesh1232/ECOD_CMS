import { useState, useRef, useCallback } from "react";
import {
  LoadScript,
  Autocomplete,
  GoogleMap,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

const DEFAULT_CENTER = { lat: 51.5074, lng: -0.1278 }; // London coordinates

const parsePlaceDetails = (place) => {
  const addressComponents = place.address_components || [];
  let streetNumber = "";
  let street = "";
  let city = "";
  let postalCode = "";
  let state = "";
  let country = "";
  let village = "";
  let neighborhood = "";

  // Enhanced address component parsing
  addressComponents.forEach((component) => {
    const types = component.types;
    if (types.includes("street_number")) streetNumber = component.long_name;
    if (types.includes("route")) street = component.long_name;
    if (types.includes("locality")) city = component.long_name;
    if (types.includes("postal_code")) postalCode = component.long_name;
    if (types.includes("administrative_area_level_1"))
      state = component.long_name;
    if (types.includes("country")) country = component.long_name;

    // Handle different types of village/small town names
    if (
      types.includes("sublocality_level_1") ||
      types.includes("sublocality")
    ) {
      village = component.long_name;
    }
    if (types.includes("neighborhood")) {
      neighborhood = component.long_name;
    }
    if (types.includes("administrative_area_level_3") && !village) {
      village = component.long_name;
    }
  });

  // Fallback logic for city/village names
  if (!city) {
    city = village || neighborhood || "";
  }

  // If we have a village but no city, and village is actually a city-level name
  if (village && !city && village.includes("City")) {
    city = village;
    village = "";
  }

  return {
    formattedAddress: place.formatted_address,
    street: `${streetNumber} ${street}`.trim(),
    city: city,
    village: village,
    postalCode,
    state,
    country,
    coordinates: {
      lat: place.geometry?.location?.lat() || 0,
      lng: place.geometry?.location?.lng() || 0,
    },
  };
};

const LocationSearch = ({ onPlaceSelected }) => {
  const autocompleteRef = useRef(null);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: ["places", "geocoding"],
  });
  const [center, setCenter] = useState(DEFAULT_CENTER);
  const [markerPosition, setMarkerPosition] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);

  const onLoadAutocomplete = useCallback((autocomplete) => {
    autocompleteRef.current = autocomplete;
  }, []);

  const onPlaceChanged = useCallback(() => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      if (place?.geometry?.location) {
        const location = parsePlaceDetails(place);
        const newCenter = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };
        setCenter(newCenter);
        setMarkerPosition(newCenter);
        setSelectedLocation(location);
        setSearchInput(place.formatted_address);
        onPlaceSelected(location);
      }
    }
  }, [onPlaceSelected]);

  const handleMapClick = useCallback(
    (e) => {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ location: e.latLng }, (results, status) => {
        if (status === "OK" && results[0]) {
          const place = results[0];
          const location = parsePlaceDetails(place);
          const newCenter = { lat: e.latLng.lat(), lng: e.latLng.lng() };
          setCenter(newCenter);
          setMarkerPosition(newCenter);
          setSelectedLocation(location);
          setSearchInput(place.formatted_address);
          onPlaceSelected(location);
        }
      });
    },
    [onPlaceSelected]
  );

  const handleSearchNearby = useCallback(() => {
    if (!selectedLocation) return;

    const service = new window.google.maps.places.PlacesService(
      document.createElement("div")
    );

    const request = {
      location: new window.google.maps.LatLng(
        selectedLocation.coordinates.lat,
        selectedLocation.coordinates.lng
      ),
      radius: 500, // Search within 500 meters
      keyword: searchInput,
    };

    service.nearbySearch(request, (results, status) => {
      if (
        status === window.google.maps.places.PlacesServiceStatus.OK &&
        results.length > 0
      ) {
        // Use the first result
        const place = results[0];
        const location = parsePlaceDetails(place);
        const newCenter = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };
        setCenter(newCenter);
        setMarkerPosition(newCenter);
        setSelectedLocation(location);
        setSearchInput(place.name);
        onPlaceSelected(location);
      }
    });
  }, [selectedLocation, searchInput, onPlaceSelected]);

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md space-y-4">
      <Label className="text-xs text-gray-500">
        NOTE*: Is this in beta version waiting for complete enhancements
      </Label>
      <div className="space-y-2">
        <Label htmlFor="location-search">Search Location</Label>
        {isLoaded ? (
          <div className="flex gap-2">
            <Autocomplete
              onLoad={onLoadAutocomplete}
              onPlaceChanged={onPlaceChanged}
              options={{
                types: ["geocode", "establishment"],
                fields: [
                  "address_components",
                  "geometry",
                  "formatted_address",
                  "name",
                ],
              }}
            >
              <Input
                id="location-search"
                type="text"
                placeholder="Enter address or search on map"
                className="bg-white dark:bg-gray-700 flex-1"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </Autocomplete>
            {selectedLocation && (
              <button
                onClick={handleSearchNearby}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                Search Nearby
              </button>
            )}
          </div>
        ) : (
          <Input
            disabled
            placeholder="Loading maps..."
            className="bg-white dark:bg-gray-700"
          />
        )}
      </div>

      {isLoaded && (
        <div className="h-96 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600">
          <GoogleMap
            mapContainerClassName="w-full h-full"
            center={center}
            zoom={markerPosition ? 15 : 12}
            onClick={handleMapClick}
            options={{
              streetViewControl: false,
              mapTypeControl: false,
              fullscreenControl: false,
            }}
          >
            {markerPosition && <Marker position={markerPosition} />}
          </GoogleMap>
        </div>
      )}

      {selectedLocation && (
        <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
          <h3 className="font-medium mb-2">Selected Location Details:</h3>
          <p>
            <span className="font-semibold">Address:</span>{" "}
            {selectedLocation.formattedAddress}
          </p>
          {selectedLocation.street && (
            <p>
              <span className="font-semibold">Street:</span>{" "}
              {selectedLocation.street}
            </p>
          )}
          {selectedLocation.village && (
            <p>
              <span className="font-semibold">Village:</span>{" "}
              {selectedLocation.village}
            </p>
          )}
          {selectedLocation.city && (
            <p>
              <span className="font-semibold">City:</span>{" "}
              {selectedLocation.city}
            </p>
          )}
          {selectedLocation.postalCode && (
            <p>
              <span className="font-semibold">Postal Code:</span>{" "}
              {selectedLocation.postalCode}
            </p>
          )}
          {selectedLocation.state && (
            <p>
              <span className="font-semibold">State/Region:</span>{" "}
              {selectedLocation.state}
            </p>
          )}
          {selectedLocation.country && (
            <p>
              <span className="font-semibold">Country:</span>{" "}
              {selectedLocation.country}
            </p>
          )}
          <p className="mt-2">
            <span className="font-semibold">Coordinates:</span>{" "}
            {selectedLocation.coordinates.lat.toFixed(6)},{" "}
            {selectedLocation.coordinates.lng.toFixed(6)}
          </p>
        </div>
      )}
    </div>
  );
};

export default LocationSearch;
