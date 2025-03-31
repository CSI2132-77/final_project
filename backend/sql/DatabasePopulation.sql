-- Insert 5 hotel chains
INSERT INTO Hotel_Chain (name, central_office_address) VALUES
('Grand Hotels', '123 Luxury Lane, New York, NY'),
('Oceanview Resorts', '456 Beach Blvd, Miami, FL'),
('Mountain Retreats', '789 Alpine Way, Denver, CO'),
('Urban Stays', '101 Downtown Ave, Chicago, IL'),
('Heritage Inns', '202 Historic Square, Boston, MA');

-- Insert contacts for all chains (2-3 contacts per chain)
INSERT INTO Chain_Contact (chain_id, contact_type, value) VALUES
(1, 'email', 'reservations@grandhotels.com'),
(1, 'phone', '800-111-1111'),
(2, 'email', 'reservations@oceanview.com'),
(2, 'phone', '800-222-2222'),
(3, 'email', 'reservations@mountainretreats.com'),
(3, 'phone', '800-333-3333'),
(4, 'email', 'reservations@urbanstays.com'),
(4, 'phone', '800-444-4444'),
(5, 'email', 'reservations@heritageinns.com'),
(5, 'phone', '800-555-5555');

-- Insert all 8 hotels for each chain (40 hotels total)
-- Grand Hotels contacts
INSERT INTO Hotel (chain_id, address, category) VALUES
(1, '100 Park Avenue, New York, NY', 5),
(1, '200 Central Park South, New York, NY', 5),
(1, '300 Sunset Boulevard, Los Angeles, CA', 4),
(1, '400 Michigan Avenue, Chicago, IL', 4),
(1, '500 Bourbon Street, New Orleans, LA', 3),
(1, '600 Fisherman''s Wharf, San Francisco, CA', 3),
(1, '700 Ocean Drive, Miami, FL', 4),
(1, '800 Beacon Street, Boston, MA', 3);
-- Oceanview Resorts contacts
INSERT INTO Hotel (chain_id, address, category) VALUES
(2, '900 Beachfront Way, Miami, FL', 5),
(2, '1000 Coastal Highway, Miami, FL', 4),
(2, '1100 Harbor View, San Diego, CA', 4),
(2, '1200 Bay Street, Tampa, FL', 3),
(2, '1300 Shoreline Drive, Santa Monica, CA', 4),
(2, '1400 Gulf Boulevard, Clearwater, FL', 3),
(2, '1500 Ocean Avenue, Santa Barbara, CA', 5),
(2, '1600 Seaside Lane, Myrtle Beach, SC', 3);
-- Mountain Retreats contacts
INSERT INTO Hotel (chain_id, address, category) VALUES
(3, '1700 Alpine Way, Denver, CO', 4),
(3, '1800 Mountain View, Aspen, CO', 5),
(3, '1900 Ski Resort Lane, Park City, UT', 4),
(3, '2000 Rocky Mountain Drive, Boulder, CO', 3),
(3, '2100 Summit Road, Vail, CO', 5),
(3, '2200 Canyon Boulevard, Sedona, AZ', 4),
(3, '2300 Forest Trail, Lake Tahoe, CA', 3),
(3, '2400 Wilderness Way, Jackson Hole, WY', 4);
-- Urban Stays contacts
INSERT INTO Hotel (chain_id, address, category) VALUES
(4, '2500 Downtown Plaza, Chicago, IL', 4),
(4, '2600 Arts District, Los Angeles, CA', 3),
(4, '2700 Financial Center, New York, NY', 5),
(4, '2800 Theater District, Boston, MA', 3),
(4, '2900 Tech Hub, San Francisco, CA', 4),
(4, '3000 Waterfront, Seattle, WA', 3),
(4, '3100 Historic Square, Philadelphia, PA', 4),
(4, '3200 Capitol View, Washington, DC', 5);
-- Heritage Inns contacts
INSERT INTO Hotel (chain_id, address, category) VALUES
(5, '3300 Colonial Square, Boston, MA', 3),
(5, '3400 Antebellum Manor, Charleston, SC', 4),
(5, '3500 Victorian Mansion, San Francisco, CA', 3),
(5, '3600 Gilded Age Hotel, New York, NY', 5),
(5, '3700 Pioneer Inn, Santa Fe, NM', 3),
(5, '3800 Plantation House, Savannah, GA', 4),
(5, '3900 Gold Rush Hotel, Denver, CO', 3),
(5, '4000 Riverfront Inn, St. Louis, MO', 4);

-- Insert hotel contacts (2 per hotel)
INSERT INTO Hotel_Contact (hotel_id, contact_type, value) VALUES
-- Grand Hotels contacts
(1, 'email', 'nyc1@grandhotels.com'), (1, 'phone', '212-111-1111'),
(2, 'email', 'nyc2@grandhotels.com'), (2, 'phone', '212-222-2222'),
(3, 'email', 'la@grandhotels.com'), (3, 'phone', '310-111-1111'),
(4, 'email', 'chicago@grandhotels.com'), (4, 'phone', '312-111-1111'),
(5, 'email', 'nola@grandhotels.com'), (5, 'phone', '504-111-1111'),
(6, 'email', 'sf@grandhotels.com'), (6, 'phone', '415-111-1111'),
(7, 'email', 'miami@grandhotels.com'), (7, 'phone', '305-111-1111'),
(8, 'email', 'boston@grandhotels.com'), (8, 'phone', '617-111-1111'),
-- Oceanview Resorts contacts
(9, 'email', 'miami1@oceanview.com'), (9, 'phone', '305-222-2222'),
(10, 'email', 'miami2@oceanview.com'), (10, 'phone', '305-333-3333'),
(11, 'email', 'sandiego@oceanview.com'), (11, 'phone', '619-222-2222'),
(12, 'email', 'tampa@oceanview.com'), (12, 'phone', '813-222-2222'),
(13, 'email', 'santamonica@oceanview.com'), (13, 'phone', '310-222-2222'),
(14, 'email', 'clearwater@oceanview.com'), (14, 'phone', '727-222-2222'),
(15, 'email', 'santabarbara@oceanview.com'), (15, 'phone', '805-222-2222'),
(16, 'email', 'myrtlebeach@oceanview.com'), (16, 'phone', '843-222-2222'),
-- Mountain Retreats contacts
(17, 'email', 'denver@mountainretreats.com'), (17, 'phone', '303-333-3333'),
(18, 'email', 'aspen@mountainretreats.com'), (18, 'phone', '970-333-3333'),
(19, 'email', 'parkcity@mountainretreats.com'), (19, 'phone', '435-333-3333'),
(20, 'email', 'boulder@mountainretreats.com'), (20, 'phone', '303-444-4444'),
(21, 'email', 'vail@mountainretreats.com'), (21, 'phone', '970-444-4444'),
(22, 'email', 'sedona@mountainretreats.com'), (22, 'phone', '928-333-3333'),
(23, 'email', 'laketahoe@mountainretreats.com'), (23, 'phone', '530-333-3333'),
(24, 'email', 'jacksonhole@mountainretreats.com'), (24, 'phone', '307-333-3333'),
-- Urban Stays contacts
(25, 'email', 'chicago@urbanstays.com'), (25, 'phone', '312-444-4444'),
(26, 'email', 'la@urbanstays.com'), (26, 'phone', '213-444-4444'),
(27, 'email', 'nyc@urbanstays.com'), (27, 'phone', '212-444-4444'),
(28, 'email', 'boston@urbanstays.com'), (28, 'phone', '617-444-4444'),
(29, 'email', 'sf@urbanstays.com'), (29, 'phone', '415-444-4444'),
(30, 'email', 'seattle@urbanstays.com'), (30, 'phone', '206-444-4444'),
(31, 'email', 'philadelphia@urbanstays.com'), (31, 'phone', '215-444-4444'),
(32, 'email', 'dc@urbanstays.com'), (32, 'phone', '202-444-4444'),
-- Heritage Inns contacts
(33, 'email', 'boston@heritageinns.com'), (33, 'phone', '617-555-5555'),
(34, 'email', 'charleston@heritageinns.com'), (34, 'phone', '843-555-5555'),
(35, 'email', 'sf@heritageinns.com'), (35, 'phone', '415-555-5555'),
(36, 'email', 'nyc@heritageinns.com'), (36, 'phone', '212-555-5555'),
(37, 'email', 'santafe@heritageinns.com'), (37, 'phone', '505-555-5555'),
(38, 'email', 'savannah@heritageinns.com'), (38, 'phone', '912-555-5555'),
(39, 'email', 'denver@heritageinns.com'), (39, 'phone', '303-555-5555'),
(40, 'email', 'stlouis@heritageinns.com'), (40, 'phone', '314-555-5555');

-- Insert rooms (5-7 rooms per hotel, 200+ rooms total)
-- Grand Hotels rooms (Hotels 1-8)
-- Hotel 1 (NYC 5-star)
INSERT INTO Room (hotel_id, price, capacity, view_type, is_extendable) VALUES
(1, 599.99, 'suite', 'sea', TRUE),
(1, 399.99, 'double', 'mountain', TRUE),
(1, 299.99, 'double', 'sea', FALSE),
(1, 199.99, 'single', 'mountain', FALSE),
(1, 499.99, 'suite', 'none', TRUE),
(1, 349.99, 'double', 'none', TRUE);

-- Hotel 2 (NYC 5-star)
INSERT INTO Room (hotel_id, price, capacity, view_type, is_extendable) VALUES
(2, 549.99, 'suite', 'none', TRUE),
(2, 379.99, 'double', 'none', TRUE),
(2, 279.99, 'double', 'none', TRUE),
(2, 179.99, 'single', 'none', FALSE),
(2, 449.99, 'suite', 'none', TRUE);

-- Hotel 3 (LA 4-star)
INSERT INTO Room (hotel_id, price, capacity, view_type, is_extendable) VALUES
(3, 449.99, 'suite', 'sea', TRUE),
(3, 299.99, 'double', 'sea', TRUE),
(3, 229.99, 'double', 'none', FALSE),
(3, 159.99, 'single', 'none', FALSE),
(3, 349.99, 'suite', 'sea', TRUE);

-- Hotel 4 (Chicago 4-star)
INSERT INTO Room (hotel_id, price, capacity, view_type, is_extendable) VALUES
(4, 429.99, 'suite', 'none', TRUE),
(4, 289.99, 'double', 'none', TRUE),
(4, 209.99, 'double', 'none', FALSE),
(4, 149.99, 'single', 'none', FALSE),
(4, 329.99, 'suite', 'none', TRUE);

-- Hotel 5 (New Orleans 3-star)
INSERT INTO Room (hotel_id, price, capacity, view_type, is_extendable) VALUES
(5, 329.99, 'suite', 'none', TRUE),
(5, 229.99, 'double', 'none', TRUE),
(5, 179.99, 'double', 'none', FALSE),
(5, 129.99, 'single', 'none', FALSE),
(5, 279.99, 'suite', 'none', TRUE);

-- Hotel 6 (San Francisco 3-star)
INSERT INTO Room (hotel_id, price, capacity, view_type, is_extendable) VALUES
(6, 339.99, 'suite', 'sea', TRUE),
(6, 239.99, 'double', 'sea', TRUE),
(6, 189.99, 'double', 'none', FALSE),
(6, 139.99, 'single', 'none', FALSE),
(6, 289.99, 'suite', 'none', TRUE);

-- Hotel 7 (Miami 4-star)
INSERT INTO Room (hotel_id, price, capacity, view_type, is_extendable) VALUES
(7, 479.99, 'suite', 'sea', TRUE),
(7, 319.99, 'double', 'sea', TRUE),
(7, 249.99, 'double', 'none', FALSE),
(7, 169.99, 'single', 'none', FALSE),
(7, 399.99, 'suite', 'sea', TRUE);

-- Hotel 8 (Boston 3-star)
INSERT INTO Room (hotel_id, price, capacity, view_type, is_extendable) VALUES
(8, 349.99, 'suite', 'none', TRUE),
(8, 249.99, 'double', 'none', TRUE),
(8, 199.99, 'double', 'none', FALSE),
(8, 149.99, 'single', 'none', FALSE),
(8, 299.99, 'suite', 'none', TRUE);

-- Oceanview Resorts rooms (Hotels 9-16)
-- Hotel 9 (Miami 5-star)
INSERT INTO Room (hotel_id, price, capacity, view_type, is_extendable) VALUES
(9, 579.99, 'suite', 'sea', TRUE),
(9, 389.99, 'double', 'sea', TRUE),
(9, 289.99, 'double', 'none', TRUE),
(9, 189.99, 'single', 'none', FALSE),
(9, 479.99, 'suite', 'sea', TRUE),
(9, 339.99, 'double', 'sea', TRUE);

-- Hotel 10 (Miami 4-star)
INSERT INTO Room (hotel_id, price, capacity, view_type, is_extendable) VALUES
(10, 499.99, 'suite', 'sea', TRUE),
(10, 349.99, 'double', 'sea', TRUE),
(10, 259.99, 'double', 'none', FALSE),
(10, 169.99, 'single', 'none', FALSE),
(10, 429.99, 'suite', 'sea', TRUE);

-- Hotel 11 (San Diego 4-star)
INSERT INTO Room (hotel_id, price, capacity, view_type, is_extendable) VALUES
(11, 459.99, 'suite', 'sea', TRUE),
(11, 309.99, 'double', 'sea', TRUE),
(11, 239.99, 'double', 'none', FALSE),
(11, 159.99, 'single', 'none', FALSE),
(11, 379.99, 'suite', 'sea', TRUE);

-- Hotel 12 (Tampa 3-star)
INSERT INTO Room (hotel_id, price, capacity, view_type, is_extendable) VALUES
(12, 349.99, 'suite', 'sea', TRUE),
(12, 249.99, 'double', 'sea', TRUE),
(12, 199.99, 'double', 'none', FALSE),
(12, 139.99, 'single', 'none', FALSE),
(12, 299.99, 'suite', 'sea', TRUE);

-- Hotel 13 (Santa Monica 4-star)
INSERT INTO Room (hotel_id, price, capacity, view_type, is_extendable) VALUES
(13, 469.99, 'suite', 'sea', TRUE),
(13, 319.99, 'double', 'sea', TRUE),
(13, 249.99, 'double', 'none', FALSE),
(13, 169.99, 'single', 'none', FALSE),
(13, 399.99, 'suite', 'sea', TRUE);

-- Hotel 14 (Clearwater 3-star)
INSERT INTO Room (hotel_id, price, capacity, view_type, is_extendable) VALUES
(14, 359.99, 'suite', 'sea', TRUE),
(14, 259.99, 'double', 'sea', TRUE),
(14, 209.99, 'double', 'none', FALSE),
(14, 149.99, 'single', 'none', FALSE),
(14, 309.99, 'suite', 'sea', TRUE);

-- Hotel 15 (Santa Barbara 5-star)
INSERT INTO Room (hotel_id, price, capacity, view_type, is_extendable) VALUES
(15, 599.99, 'suite', 'sea', TRUE),
(15, 399.99, 'double', 'sea', TRUE),
(15, 299.99, 'double', 'mountain', TRUE),
(15, 199.99, 'single', 'none', FALSE),
(15, 499.99, 'suite', 'sea', TRUE),
(15, 349.99, 'double', 'sea', TRUE);

-- Hotel 16 (Myrtle Beach 3-star)
INSERT INTO Room (hotel_id, price, capacity, view_type, is_extendable) VALUES
(16, 329.99, 'suite', 'sea', TRUE),
(16, 229.99, 'double', 'sea', TRUE),
(16, 179.99, 'double', 'none', FALSE),
(16, 129.99, 'single', 'none', FALSE),
(16, 279.99, 'suite', 'sea', TRUE);

-- Mountain Retreats rooms (Hotels 17-24)
-- Hotel 17 (Denver 4-star)
INSERT INTO Room (hotel_id, price, capacity, view_type, is_extendable) VALUES
(17, 429.99, 'suite', 'mountain', TRUE),
(17, 279.99, 'double', 'mountain', TRUE),
(17, 219.99, 'double', 'none', FALSE),
(17, 159.99, 'single', 'none', FALSE),
(17, 379.99, 'suite', 'none', TRUE);

-- Hotel 18 (Aspen 5-star)
INSERT INTO Room (hotel_id, price, capacity, view_type, is_extendable) VALUES
(18, 549.99, 'suite', 'mountain', TRUE),
(18, 379.99, 'double', 'mountain', TRUE),
(18, 289.99, 'double', 'none', TRUE),
(18, 199.99, 'single', 'none', FALSE),
(18, 479.99, 'suite', 'none', TRUE),
(18, 329.99, 'double', 'mountain', TRUE);

-- Hotel 19 (Park City 4-star)
INSERT INTO Room (hotel_id, price, capacity, view_type, is_extendable) VALUES
(19, 439.99, 'suite', 'mountain', TRUE),
(19, 289.99, 'double', 'mountain', TRUE),
(19, 229.99, 'double', 'none', FALSE),
(19, 169.99, 'single', 'none', FALSE),
(19, 389.99, 'suite', 'mountain', TRUE);

-- Hotel 20 (Boulder 3-star)
INSERT INTO Room (hotel_id, price, capacity, view_type, is_extendable) VALUES
(20, 339.99, 'suite', 'mountain', TRUE),
(20, 239.99, 'double', 'mountain', TRUE),
(20, 189.99, 'double', 'none', FALSE),
(20, 139.99, 'single', 'none', FALSE),
(20, 299.99, 'suite', 'none', TRUE);

-- Hotel 21 (Vail 5-star)
INSERT INTO Room (hotel_id, price, capacity, view_type, is_extendable) VALUES
(21, 569.99, 'suite', 'mountain', TRUE),
(21, 389.99, 'double', 'mountain', TRUE),
(21, 299.99, 'double', 'none', TRUE),
(21, 209.99, 'single', 'none', FALSE),
(21, 489.99, 'suite', 'none', TRUE),
(21, 349.99, 'double', 'mountain', TRUE);

-- Hotel 22 (Sedona 4-star)
INSERT INTO Room (hotel_id, price, capacity, view_type, is_extendable) VALUES
(22, 459.99, 'suite', 'mountain', TRUE),
(22, 309.99, 'double', 'mountain', TRUE),
(22, 249.99, 'double', 'none', FALSE),
(22, 179.99, 'single', 'none', FALSE),
(22, 399.99, 'suite', 'mountain', TRUE);

-- Hotel 23 (Lake Tahoe 3-star)
INSERT INTO Room (hotel_id, price, capacity, view_type, is_extendable) VALUES
(23, 349.99, 'suite', 'none', TRUE),
(23, 249.99, 'double', 'none', TRUE),
(23, 199.99, 'double', 'none', FALSE),
(23, 149.99, 'single', 'none', FALSE),
(23, 309.99, 'suite', 'none', TRUE);

-- Hotel 24 (Jackson Hole 4-star)
INSERT INTO Room (hotel_id, price, capacity, view_type, is_extendable) VALUES
(24, 469.99, 'suite', 'mountain', TRUE),
(24, 319.99, 'double', 'mountain', TRUE),
(24, 259.99, 'double', 'none', FALSE),
(24, 189.99, 'single', 'none', FALSE),
(24, 419.99, 'suite', 'none', TRUE);

-- Urban Stays rooms (Hotels 25-32)
-- Hotel 25 (Chicago 4-star)
INSERT INTO Room (hotel_id, price, capacity, view_type, is_extendable) VALUES
(25, 439.99, 'suite', 'none', TRUE),
(25, 289.99, 'double', 'none', TRUE),
(25, 229.99, 'double', 'none', FALSE),
(25, 169.99, 'single', 'none', FALSE),
(25, 389.99, 'suite', 'none', TRUE);

-- Hotel 26 (LA 3-star)
INSERT INTO Room (hotel_id, price, capacity, view_type, is_extendable) VALUES
(26, 339.99, 'suite', 'none', TRUE),
(26, 239.99, 'double', 'none', TRUE),
(26, 189.99, 'double', 'none', FALSE),
(26, 139.99, 'single', 'none', FALSE),
(26, 299.99, 'suite', 'none', TRUE);

-- Hotel 27 (NYC 5-star)
INSERT INTO Room (hotel_id, price, capacity, view_type, is_extendable) VALUES
(27, 589.99, 'suite', 'none', TRUE),
(27, 399.99, 'double', 'none', TRUE),
(27, 309.99, 'double', 'none', TRUE),
(27, 209.99, 'single', 'none', FALSE),
(27, 499.99, 'suite', 'none', TRUE),
(27, 359.99, 'double', 'none', TRUE);

-- Hotel 28 (Boston 3-star)
INSERT INTO Room (hotel_id, price, capacity, view_type, is_extendable) VALUES
(28, 349.99, 'suite', 'none', TRUE),
(28, 249.99, 'double', 'none', TRUE),
(28, 199.99, 'double', 'none', FALSE),
(28, 149.99, 'single', 'none', FALSE),
(28, 309.99, 'suite', 'none', TRUE);

-- Hotel 29 (San Francisco 4-star)
INSERT INTO Room (hotel_id, price, capacity, view_type, is_extendable) VALUES
(29, 459.99, 'suite', 'none', TRUE),
(29, 309.99, 'double', 'none', TRUE),
(29, 249.99, 'double', 'none', FALSE),
(29, 179.99, 'single', 'none', FALSE),
(29, 409.99, 'suite', 'none', TRUE);

-- Hotel 30 (Seattle 3-star)
INSERT INTO Room (hotel_id, price, capacity, view_type, is_extendable) VALUES
(30, 359.99, 'suite', 'none', TRUE),
(30, 259.99, 'double', 'none', TRUE),
(30, 209.99, 'double', 'none', FALSE),
(30, 159.99, 'single', 'none', FALSE),
(30, 329.99, 'suite', 'none', TRUE);

-- Hotel 31 (Philadelphia 4-star)
INSERT INTO Room (hotel_id, price, capacity, view_type, is_extendable) VALUES
(31, 449.99, 'suite', 'none', TRUE),
(31, 299.99, 'double', 'none', TRUE),
(31, 239.99, 'double', 'none', FALSE),
(31, 169.99, 'single', 'none', FALSE),
(31, 399.99, 'suite', 'none', TRUE);

-- Hotel 32 (Washington DC 5-star)
INSERT INTO Room (hotel_id, price, capacity, view_type, is_extendable) VALUES
(32, 579.99, 'suite', 'none', TRUE),
(32, 389.99, 'double', 'none', TRUE),
(32, 299.99, 'double', 'none', TRUE),
(32, 199.99, 'single', 'none', FALSE),
(32, 489.99, 'suite', 'none', TRUE),
(32, 349.99, 'double', 'none', TRUE);

-- Heritage Inns rooms (Hotels 33-40)
-- Hotel 33 (Boston 3-star)
INSERT INTO Room (hotel_id, price, capacity, view_type, is_extendable) VALUES
(33, 349.99, 'suite', 'none', TRUE),
(33, 249.99, 'double', 'none', TRUE),
(33, 199.99, 'double', 'none', FALSE),
(33, 149.99, 'single', 'none', FALSE),
(33, 309.99, 'suite', 'none', TRUE);

-- Hotel 34 (Charleston 4-star)
INSERT INTO Room (hotel_id, price, capacity, view_type, is_extendable) VALUES
(34, 439.99, 'suite', 'none', TRUE),
(34, 289.99, 'double', 'none', TRUE),
(34, 229.99, 'double', 'none', FALSE),
(34, 169.99, 'single', 'none', FALSE),
(34, 389.99, 'suite', 'none', TRUE);

-- Hotel 35 (San Francisco 3-star)
INSERT INTO Room (hotel_id, price, capacity, view_type, is_extendable) VALUES
(35, 359.99, 'suite', 'none', TRUE),
(35, 259.99, 'double', 'none', TRUE),
(35, 209.99, 'double', 'none', FALSE),
(35, 159.99, 'single', 'none', FALSE),
(35, 329.99, 'suite', 'none', TRUE);

-- Hotel 36 (NYC 5-star)
INSERT INTO Room (hotel_id, price, capacity, view_type, is_extendable) VALUES
(36, 559.99, 'suite', 'none', TRUE),
(36, 379.99, 'double', 'none', TRUE),
(36, 289.99, 'double', 'none', TRUE),
(36, 189.99, 'single', 'none', FALSE),
(36, 479.99, 'suite', 'none', TRUE),
(36, 339.99, 'double', 'none', TRUE);

-- Hotel 37 (Santa Fe 3-star)
INSERT INTO Room (hotel_id, price, capacity, view_type, is_extendable) VALUES
(37, 339.99, 'suite', 'mountain', TRUE),
(37, 239.99, 'double', 'mountain', TRUE),
(37, 189.99, 'double', 'none', FALSE),
(37, 139.99, 'single', 'none', FALSE),
(37, 299.99, 'suite', 'mountain', TRUE);

-- Hotel 38 (Savannah 4-star)
INSERT INTO Room (hotel_id, price, capacity, view_type, is_extendable) VALUES
(38, 429.99, 'suite', 'none', TRUE),
(38, 279.99, 'double', 'none', TRUE),
(38, 219.99, 'double', 'none', FALSE),
(38, 159.99, 'single', 'none', FALSE),
(38, 379.99, 'suite', 'none', TRUE);

-- Hotel 39 (Denver 3-star)
INSERT INTO Room (hotel_id, price, capacity, view_type, is_extendable) VALUES
(39, 349.99, 'suite', 'mountain', TRUE),
(39, 249.99, 'double', 'mountain', TRUE),
(39, 199.99, 'double', 'none', FALSE),
(39, 149.99, 'single', 'none', FALSE),
(39, 309.99, 'suite', 'mountain', TRUE);

-- Hotel 40 (St. Louis 4-star)
INSERT INTO Room (hotel_id, price, capacity, view_type, is_extendable) VALUES
(40, 449.99, 'suite', 'none', TRUE),
(40, 299.99, 'double', 'none', TRUE),
(40, 239.99, 'double', 'none', FALSE),
(40, 179.99, 'single', 'none', FALSE),
(40, 399.99, 'suite', 'none', TRUE);

-- Room amenities for all rooms (3-5 amenities per room)
-- Hotel 1 amenities
INSERT INTO Room_Amenity (room_id, amenity) VALUES
(1, 'TV'), (1, 'Air Conditioning'), (1, 'Mini Bar'), (1, 'City View'),
(2, 'TV'), (2, 'Air Conditioning'), (2, 'Coffee Maker'),
(3, 'TV'), (3, 'Air Conditioning'),
(4, 'TV'), (4, 'Air Conditioning'),
(5, 'TV'), (5, 'Air Conditioning'), (5, 'Balcony'),
(6, 'TV'), (6, 'Air Conditioning'), (6, 'Work Desk');

-- Hotel 2 amenities
INSERT INTO Room_Amenity (room_id, amenity) VALUES
(7, 'TV'), (7, 'Air Conditioning'), (7, 'Mini Bar'), (7, 'City View'),
(8, 'TV'), (8, 'Air Conditioning'), (8, 'Coffee Maker'), (8, 'Safe'),
(9, 'TV'), (9, 'Air Conditioning'), (9, 'Park View'),
(10, 'TV'), (10, 'Air Conditioning'),
(11, 'TV'), (11, 'Air Conditioning'), (11, 'Balcony'), (11, 'Park View');

-- Hotel 3 amenities
INSERT INTO Room_Amenity (room_id, amenity) VALUES
(12, 'TV'), (12, 'Air Conditioning'), (12, 'Mini Bar'), (12, 'Ocean View'),
(13, 'TV'), (13, 'Air Conditioning'), (13, 'Coffee Maker'), (13, 'Ocean View'),
(14, 'TV'), (14, 'Air Conditioning'),
(15, 'TV'), (15, 'Air Conditioning'), (15, 'Ocean View'),
(16, 'TV'), (16, 'Air Conditioning'), (16, 'Mini Bar'), (16, 'Ocean View');

-- Hotel 4 amenities
INSERT INTO Room_Amenity (room_id, amenity) VALUES
(17, 'TV'), (17, 'Air Conditioning'), (17, 'Mini Bar'), (17, 'Lake View'),
(18, 'TV'), (18, 'Air Conditioning'), (18, 'Coffee Maker'), (18, 'Lake View'),
(19, 'TV'), (19, 'Air Conditioning'),
(20, 'TV'), (20, 'Air Conditioning'),
(21, 'TV'), (21, 'Air Conditioning'), (21, 'Lake View');

-- Hotel 5 amenities
INSERT INTO Room_Amenity (room_id, amenity) VALUES
(22, 'TV'), (22, 'Air Conditioning'), (22, 'Mini Bar'),
(23, 'TV'), (23, 'Air Conditioning'), (23, 'Coffee Maker'),
(24, 'TV'), (24, 'Air Conditioning'),
(25, 'TV'), (25, 'Air Conditioning'),
(26, 'TV'), (26, 'Air Conditioning'), (26, 'Balcony');

-- Hotel 6 amenities
INSERT INTO Room_Amenity (room_id, amenity) VALUES
(27, 'TV'), (27, 'Air Conditioning'), (27, 'Mini Bar'), (27, 'Bay View'),
(28, 'TV'), (28, 'Air Conditioning'), (28, 'Coffee Maker'), (28, 'Bay View'),
(29, 'TV'), (29, 'Air Conditioning'),
(30, 'TV'), (30, 'Air Conditioning'),
(31, 'TV'), (31, 'Air Conditioning'), (31, 'Bay View');

-- Hotel 7 amenities
INSERT INTO Room_Amenity (room_id, amenity) VALUES
(32, 'TV'), (32, 'Air Conditioning'), (32, 'Mini Bar'), (32, 'Ocean View'),
(33, 'TV'), (33, 'Air Conditioning'), (33, 'Coffee Maker'), (33, 'Ocean View'),
(34, 'TV'), (34, 'Air Conditioning'),
(35, 'TV'), (35, 'Air Conditioning'), (35, 'Ocean View'),
(36, 'TV'), (36, 'Air Conditioning'), (36, 'Mini Bar'), (36, 'Ocean View');

-- Hotel 8 amenities
INSERT INTO Room_Amenity (room_id, amenity) VALUES
(37, 'TV'), (37, 'Air Conditioning'), (37, 'Mini Bar'), (37, 'City View'),
(38, 'TV'), (38, 'Air Conditioning'), (38, 'Coffee Maker'), (38, 'City View'),
(39, 'TV'), (39, 'Air Conditioning'),
(40, 'TV'), (40, 'Air Conditioning'),
(41, 'TV'), (41, 'Air Conditioning'), (41, 'River View');

-- Hotel 9 amenities
INSERT INTO Room_Amenity (room_id, amenity) VALUES
(42, 'TV'), (42, 'Air Conditioning'), (42, 'Mini Bar'), (42, 'Ocean View'),
(43, 'TV'), (43, 'Air Conditioning'), (43, 'Coffee Maker'), (43, 'Ocean View'),
(44, 'TV'), (44, 'Air Conditioning'), (44, 'Safe'),
(45, 'TV'), (45, 'Air Conditioning'),
(46, 'TV'), (46, 'Air Conditioning'), (46, 'Mini Bar'), (46, 'Ocean View'),
(47, 'TV'), (47, 'Air Conditioning'), (47, 'Ocean View');

-- Hotel 10 amenities
INSERT INTO Room_Amenity (room_id, amenity) VALUES
(48, 'TV'), (48, 'Air Conditioning'), (48, 'Mini Bar'), (48, 'Ocean View'),
(49, 'TV'), (49, 'Air Conditioning'), (49, 'Coffee Maker'), (49, 'Ocean View'),
(50, 'TV'), (50, 'Air Conditioning'),
(51, 'TV'), (51, 'Air Conditioning'),
(52, 'TV'), (52, 'Air Conditioning'), (52, 'Ocean View');

-- Hotel 11 amenities (San Diego 4-star)
INSERT INTO Room_Amenity (room_id, amenity) VALUES
(53, 'TV'), (53, 'Air Conditioning'), (53, 'Mini Bar'), (53, 'Harbor View'),
(54, 'TV'), (54, 'Air Conditioning'), (54, 'Coffee Maker'), (54, 'Harbor View'),
(55, 'TV'), (55, 'Air Conditioning'), (55, 'Safe'),
(56, 'TV'), (56, 'Air Conditioning'),
(57, 'TV'), (57, 'Air Conditioning'), (57, 'Harbor View');

-- Hotel 12 amenities (Tampa 3-star)
INSERT INTO Room_Amenity (room_id, amenity) VALUES
(58, 'TV'), (58, 'Air Conditioning'), (58, 'Mini Bar'),
(59, 'TV'), (59, 'Air Conditioning'), (59, 'Coffee Maker'),
(60, 'TV'), (60, 'Air Conditioning'),
(61, 'TV'), (61, 'Air Conditioning'),
(62, 'TV'), (62, 'Air Conditioning'), (62, 'Bay View');

-- Hotel 13 amenities (Santa Monica 4-star)
INSERT INTO Room_Amenity (room_id, amenity) VALUES
(63, 'TV'), (63, 'Air Conditioning'), (63, 'Mini Bar'), (63, 'Ocean View'),
(64, 'TV'), (64, 'Air Conditioning'), (64, 'Coffee Maker'), (64, 'Ocean View'),
(65, 'TV'), (65, 'Air Conditioning'),
(66, 'TV'), (66, 'Air Conditioning'),
(67, 'TV'), (67, 'Air Conditioning'), (67, 'Ocean View');

-- Hotel 14 amenities (Clearwater 3-star)
INSERT INTO Room_Amenity (room_id, amenity) VALUES
(68, 'TV'), (68, 'Air Conditioning'), (68, 'Mini Bar'),
(69, 'TV'), (69, 'Air Conditioning'), (69, 'Coffee Maker'),
(70, 'TV'), (70, 'Air Conditioning'),
(71, 'TV'), (71, 'Air Conditioning'),
(72, 'TV'), (72, 'Air Conditioning'), (72, 'Gulf View');

-- Hotel 15 amenities (Santa Barbara 5-star)
INSERT INTO Room_Amenity (room_id, amenity) VALUES
(73, 'TV'), (73, 'Air Conditioning'), (73, 'Mini Bar'), (73, 'Ocean View'), (73, 'Balcony'),
(74, 'TV'), (74, 'Air Conditioning'), (74, 'Coffee Maker'), (74, 'Ocean View'),
(75, 'TV'), (75, 'Air Conditioning'), (75, 'Mountain View'),
(76, 'TV'), (76, 'Air Conditioning'),
(77, 'TV'), (77, 'Air Conditioning'), (77, 'Mini Bar'), (77, 'Ocean View'), (77, 'Balcony'),
(78, 'TV'), (78, 'Air Conditioning'), (78, 'Ocean View');

-- Hotel 16 amenities (Myrtle Beach 3-star)
INSERT INTO Room_Amenity (room_id, amenity) VALUES
(79, 'TV'), (79, 'Air Conditioning'), (79, 'Mini Bar'),
(80, 'TV'), (80, 'Air Conditioning'), (80, 'Coffee Maker'),
(81, 'TV'), (81, 'Air Conditioning'),
(82, 'TV'), (82, 'Air Conditioning'),
(83, 'TV'), (83, 'Air Conditioning'), (83, 'Ocean View');

-- Hotel 17 amenities (Denver 4-star)
INSERT INTO Room_Amenity (room_id, amenity) VALUES
(84, 'TV'), (84, 'Air Conditioning'), (84, 'Mini Bar'), (84, 'Mountain View'),
(85, 'TV'), (85, 'Air Conditioning'), (85, 'Coffee Maker'), (85, 'Mountain View'),
(86, 'TV'), (86, 'Air Conditioning'),
(87, 'TV'), (87, 'Air Conditioning'),
(88, 'TV'), (88, 'Air Conditioning'), (88, 'City View');

-- Hotel 18 amenities (Aspen 5-star)
INSERT INTO Room_Amenity (room_id, amenity) VALUES
(89, 'TV'), (89, 'Air Conditioning'), (89, 'Mini Bar'), (89, 'Mountain View'), (89, 'Fireplace'),
(90, 'TV'), (90, 'Air Conditioning'), (90, 'Coffee Maker'), (90, 'Mountain View'),
(91, 'TV'), (91, 'Air Conditioning'), (91, 'Valley View'),
(92, 'TV'), (92, 'Air Conditioning'),
(93, 'TV'), (93, 'Air Conditioning'), (93, 'Mini Bar'), (93, 'Valley View'),
(94, 'TV'), (94, 'Air Conditioning'), (94, 'Mountain View');

-- Hotel 19 amenities (Park City 4-star)
INSERT INTO Room_Amenity (room_id, amenity) VALUES
(95, 'TV'), (95, 'Air Conditioning'), (95, 'Mini Bar'), (95, 'Slope View'),
(96, 'TV'), (96, 'Air Conditioning'), (96, 'Coffee Maker'), (96, 'Slope View'),
(97, 'TV'), (97, 'Air Conditioning'),
(98, 'TV'), (98, 'Air Conditioning'),
(99, 'TV'), (99, 'Air Conditioning'), (99, 'Slope View');

-- Hotel 20 amenities (Boulder 3-star)
INSERT INTO Room_Amenity (room_id, amenity) VALUES
(100, 'TV'), (100, 'Air Conditioning'), (100, 'Mini Bar'),
(101, 'TV'), (101, 'Air Conditioning'), (101, 'Coffee Maker'),
(102, 'TV'), (102, 'Air Conditioning'),
(103, 'TV'), (103, 'Air Conditioning'),
(104, 'TV'), (104, 'Air Conditioning'), (104, 'Mountain View');

-- Hotel 21 amenities (Vail 5-star)
INSERT INTO Room_Amenity (room_id, amenity) VALUES
(105, 'TV'), (105, 'Air Conditioning'), (105, 'Mini Bar'), (105, 'Mountain View'), (105, 'Fireplace'),
(106, 'TV'), (106, 'Air Conditioning'), (106, 'Coffee Maker'), (106, 'Mountain View'),
(107, 'TV'), (107, 'Air Conditioning'), (107, 'Village View'),
(108, 'TV'), (108, 'Air Conditioning'),
(109, 'TV'), (109, 'Air Conditioning'), (109, 'Mini Bar'), (109, 'Village View'),
(110, 'TV'), (110, 'Air Conditioning'), (110, 'Mountain View');

-- Hotel 22 amenities (Sedona 4-star)
INSERT INTO Room_Amenity (room_id, amenity) VALUES
(111, 'TV'), (111, 'Air Conditioning'), (111, 'Mini Bar'), (111, 'Canyon View'),
(112, 'TV'), (112, 'Air Conditioning'), (112, 'Coffee Maker'), (112, 'Canyon View'),
(113, 'TV'), (113, 'Air Conditioning'),
(114, 'TV'), (114, 'Air Conditioning'),
(115, 'TV'), (115, 'Air Conditioning'), (115, 'Canyon View');

-- Hotel 23 amenities (Lake Tahoe 3-star)
INSERT INTO Room_Amenity (room_id, amenity) VALUES
(116, 'TV'), (116, 'Air Conditioning'), (116, 'Mini Bar'),
(117, 'TV'), (117, 'Air Conditioning'), (117, 'Coffee Maker'),
(118, 'TV'), (118, 'Air Conditioning'), (118, 'Lake View'),
(119, 'TV'), (119, 'Air Conditioning'),
(120, 'TV'), (120, 'Air Conditioning'), (120, 'Forest View');

-- Hotel 24 amenities (Jackson Hole 4-star)
INSERT INTO Room_Amenity (room_id, amenity) VALUES
(121, 'TV'), (121, 'Air Conditioning'), (121, 'Mini Bar'), (121, 'Mountain View'),
(122, 'TV'), (122, 'Air Conditioning'), (122, 'Coffee Maker'), (122, 'Mountain View'),
(123, 'TV'), (123, 'Air Conditioning'), (123, 'Valley View'),
(124, 'TV'), (124, 'Air Conditioning'),
(125, 'TV'), (125, 'Air Conditioning'), (125, 'Valley View');

-- Hotel 25 amenities (Chicago 4-star)
INSERT INTO Room_Amenity (room_id, amenity) VALUES
(126, 'TV'), (126, 'Air Conditioning'), (126, 'Mini Bar'), (126, 'City View'),
(127, 'TV'), (127, 'Air Conditioning'), (127, 'Coffee Maker'), (127, 'City View'),
(128, 'TV'), (128, 'Air Conditioning'),
(129, 'TV'), (129, 'Air Conditioning'),
(130, 'TV'), (130, 'Air Conditioning'), (130, 'Lake View');

-- Hotel 26 amenities (LA 3-star)
INSERT INTO Room_Amenity (room_id, amenity) VALUES
(131, 'TV'), (131, 'Air Conditioning'), (131, 'Mini Bar'),
(132, 'TV'), (132, 'Air Conditioning'), (132, 'Coffee Maker'),
(133, 'TV'), (133, 'Air Conditioning'),
(134, 'TV'), (134, 'Air Conditioning'),
(135, 'TV'), (135, 'Air Conditioning'), (135, 'City View');

-- Hotel 27 amenities (NYC 5-star)
INSERT INTO Room_Amenity (room_id, amenity) VALUES
(136, 'TV'), (136, 'Air Conditioning'), (136, 'Mini Bar'), (136, 'City View'), (136, 'Balcony'),
(137, 'TV'), (137, 'Air Conditioning'), (137, 'Coffee Maker'), (137, 'City View'),
(138, 'TV'), (138, 'Air Conditioning'), (138, 'River View'),
(139, 'TV'), (139, 'Air Conditioning'),
(140, 'TV'), (140, 'Air Conditioning'), (140, 'Mini Bar'), (140, 'River View'),
(141, 'TV'), (141, 'Air Conditioning'), (141, 'City View');

-- Hotel 28 amenities (Boston 3-star)
INSERT INTO Room_Amenity (room_id, amenity) VALUES
(142, 'TV'), (142, 'Air Conditioning'), (142, 'Mini Bar'),
(143, 'TV'), (143, 'Air Conditioning'), (143, 'Coffee Maker'),
(144, 'TV'), (144, 'Air Conditioning'),
(145, 'TV'), (145, 'Air Conditioning'),
(146, 'TV'), (146, 'Air Conditioning'), (146, 'Harbor View');

-- Hotel 29 amenities (San Francisco 4-star)
INSERT INTO Room_Amenity (room_id, amenity) VALUES
(147, 'TV'), (147, 'Air Conditioning'), (147, 'Mini Bar'), (147, 'City View'),
(148, 'TV'), (148, 'Air Conditioning'), (148, 'Coffee Maker'), (148, 'City View'),
(149, 'TV'), (149, 'Air Conditioning'), (149, 'Bay View'),
(150, 'TV'), (150, 'Air Conditioning'),
(151, 'TV'), (151, 'Air Conditioning'), (151, 'Bay View');

-- Hotel 30 amenities (Seattle 3-star)
INSERT INTO Room_Amenity (room_id, amenity) VALUES
(152, 'TV'), (152, 'Air Conditioning'), (152, 'Mini Bar'),
(153, 'TV'), (153, 'Air Conditioning'), (153, 'Coffee Maker'),
(154, 'TV'), (154, 'Air Conditioning'), (154, 'Waterfront View'),
(155, 'TV'), (155, 'Air Conditioning'),
(156, 'TV'), (156, 'Air Conditioning'), (156, 'Waterfront View');

-- Hotel 31 amenities (Philadelphia 4-star)
INSERT INTO Room_Amenity (room_id, amenity) VALUES
(157, 'TV'), (157, 'Air Conditioning'), (157, 'Mini Bar'), (157, 'City View'),
(158, 'TV'), (158, 'Air Conditioning'), (158, 'Coffee Maker'), (158, 'City View'),
(159, 'TV'), (159, 'Air Conditioning'), (159, 'Park View'),
(160, 'TV'), (160, 'Air Conditioning'),
(161, 'TV'), (161, 'Air Conditioning'), (161, 'Park View');

-- Hotel 32 amenities (Washington DC 5-star)
INSERT INTO Room_Amenity (room_id, amenity) VALUES
(162, 'TV'), (162, 'Air Conditioning'), (162, 'Mini Bar'), (162, 'City View'), (162, 'Balcony'),
(163, 'TV'), (163, 'Air Conditioning'), (163, 'Coffee Maker'), (163, 'City View'),
(164, 'TV'), (164, 'Air Conditioning'), (164, 'Monument View'),
(165, 'TV'), (165, 'Air Conditioning'),
(166, 'TV'), (166, 'Air Conditioning'), (166, 'Mini Bar'), (166, 'Monument View'),
(167, 'TV'), (167, 'Air Conditioning'), (167, 'City View');

-- Hotel 33 amenities (Boston 3-star)
INSERT INTO Room_Amenity (room_id, amenity) VALUES
(168, 'TV'), (168, 'Air Conditioning'), (168, 'Mini Bar'),
(169, 'TV'), (169, 'Air Conditioning'), (169, 'Coffee Maker'),
(170, 'TV'), (170, 'Air Conditioning'), (170, 'Historic View'),
(171, 'TV'), (171, 'Air Conditioning'),
(172, 'TV'), (172, 'Air Conditioning'), (172, 'Garden View');

-- Hotel 34 amenities (Charleston 4-star)
INSERT INTO Room_Amenity (room_id, amenity) VALUES
(173, 'TV'), (173, 'Air Conditioning'), (173, 'Mini Bar'), (173, 'Historic View'),
(174, 'TV'), (174, 'Air Conditioning'), (174, 'Coffee Maker'), (174, 'Historic View'),
(175, 'TV'), (175, 'Air Conditioning'), (175, 'River View'),
(176, 'TV'), (176, 'Air Conditioning'),
(177, 'TV'), (177, 'Air Conditioning'), (177, 'River View');

-- Hotel 35 amenities (San Francisco 3-star)
INSERT INTO Room_Amenity (room_id, amenity) VALUES
(178, 'TV'), (178, 'Air Conditioning'), (178, 'Mini Bar'),
(179, 'TV'), (179, 'Air Conditioning'), (179, 'Coffee Maker'),
(180, 'TV'), (180, 'Air Conditioning'), (180, 'Victorian Decor'),
(181, 'TV'), (181, 'Air Conditioning'),
(182, 'TV'), (182, 'Air Conditioning'), (182, 'City View');

-- Hotel 36 amenities (NYC 5-star)
INSERT INTO Room_Amenity (room_id, amenity) VALUES
(183, 'TV'), (183, 'Air Conditioning'), (183, 'Mini Bar'), (183, 'Gilded Decor'), (183, 'Balcony'),
(184, 'TV'), (184, 'Air Conditioning'), (184, 'Coffee Maker'), (184, 'Gilded Decor'),
(185, 'TV'), (185, 'Air Conditioning'), (185, 'Park View'),
(186, 'TV'), (186, 'Air Conditioning'),
(187, 'TV'), (187, 'Air Conditioning'), (187, 'Mini Bar'), (187, 'Park View'),
(188, 'TV'), (188, 'Air Conditioning'), (188, 'City View');

-- Hotel 37 amenities (Santa Fe 3-star)
INSERT INTO Room_Amenity (room_id, amenity) VALUES
(189, 'TV'), (189, 'Air Conditioning'), (189, 'Mini Bar'),
(190, 'TV'), (190, 'Air Conditioning'), (190, 'Coffee Maker'),
(191, 'TV'), (191, 'Air Conditioning'), (191, 'Adobe Decor'),
(192, 'TV'), (192, 'Air Conditioning'),
(193, 'TV'), (193, 'Air Conditioning'), (193, 'Mountain View');

-- Hotel 38 amenities (Savannah 4-star)
INSERT INTO Room_Amenity (room_id, amenity) VALUES
(194, 'TV'), (194, 'Air Conditioning'), (194, 'Mini Bar'), (194, 'Plantation Decor'),
(195, 'TV'), (195, 'Air Conditioning'), (195, 'Coffee Maker'), (195, 'Plantation Decor'),
(196, 'TV'), (196, 'Air Conditioning'), (196, 'Garden View'),
(197, 'TV'), (197, 'Air Conditioning'),
(198, 'TV'), (198, 'Air Conditioning'), (198, 'Garden View');

-- Hotel 39 amenities (Denver 3-star)
INSERT INTO Room_Amenity (room_id, amenity) VALUES
(199, 'TV'), (199, 'Air Conditioning'), (199, 'Mini Bar'),
(200, 'TV'), (200, 'Air Conditioning'), (200, 'Coffee Maker'),
(201, 'TV'), (201, 'Air Conditioning'), (201, 'Historic Decor'),
(202, 'TV'), (202, 'Air Conditioning'),
(203, 'TV'), (203, 'Air Conditioning'), (203, 'Mountain View');

-- Hotel 40 amenities (St. Louis 4-star)
INSERT INTO Room_Amenity (room_id, amenity) VALUES
(204, 'TV'), (204, 'Air Conditioning'), (204, 'Mini Bar'), (204, 'Riverfront View'),
(205, 'TV'), (205, 'Air Conditioning'), (205, 'Coffee Maker'), (205, 'Riverfront View'),
(206, 'TV'), (206, 'Air Conditioning'), (206, 'Arch View'),
(207, 'TV'), (207, 'Air Conditioning'),
(208, 'TV'), (208, 'Air Conditioning'), (208, 'Arch View');

-- Insert some room problems (about 10% of rooms have problems)
INSERT INTO Room_Problem (room_id, problem_description) VALUES
(3, 'Leaky faucet in bathroom'),
(5, 'TV remote not working'),
(12, 'Air conditioning not cooling properly'),
(18, 'Stained carpet'),
(22, 'Broken lamp'),
(27, 'Slow draining shower'),
(35, 'Stuck window'),
(41, 'Loose door handle'),
(48, 'Scratched furniture'),
(53, 'Noisy refrigerator');

-- Hotel 1 employees (NYC 5-star)
INSERT INTO Employee (hotel_id, full_name, address, ssn_sin, role) VALUES
(1, 'John Smith', '123 Main St, NY', '111-11-1111', 'manager'),
(1, 'Alice Johnson', '456 Oak Ave, NY', '222-22-2222', 'receptionist'),
(1, 'Bob Williams', '789 Pine Rd, NY', '333-33-3333', 'housekeeping'),
-- Hotel 2 employees (NYC 5-star)
(2, 'Emily Wilson', '404 Cedar Blvd, NY', '777-77-7777', 'manager'),
(2, 'David Taylor', '505 Redwood Dr, NY', '888-88-8888', 'receptionist'),
(2, 'Jessica Anderson', '606 Spruce Ct, NY', '999-99-9999', 'housekeeping'),
-- Hotel 3 employees (LA 4-star)
(3, 'Michael Rodriguez', '100 Palm Blvd, LA', '456-78-9012', 'manager'),
(3, 'Sarah Wilson', '200 Sequoia Rd, LA', '577-89-0123', 'receptionist'),
(3, 'Daniel Martinez', '300 Juniper Ln, LA', '679-90-1234', 'housekeeping'),
-- Hotel 4 employees (Chicago 4-star)
(4, 'Matthew Johnson', '600 Sycamore Ln, Chicago', '901-23-4567', 'manager'),
(4, 'Amanda White', '700 Dogwood Ave, Chicago', '112-34-5678', 'receptionist'),
(4, 'Kevin Lee', '800 Hickory St, Chicago', '123-45-6789', 'housekeeping'),
-- Hotel 5 employees (New Orleans 3-star)
(5, 'Charles Walker', '1200 Oak Ave, New Orleans', '567-89-0123', 'manager'),
(5, 'Karen Hall', '1300 Pine Rd, New Orleans', '678-91-1234', 'receptionist'),
(5, 'Steven Allen', '1400 Elm St, New Orleans', '789-11-2345', 'housekeeping'),
-- Hotel 6 employees (San Francisco 3-star)
(6, 'Mark Scott', '1700 Cedar Blvd, SF', '212-34-5678', 'manager'),
(6, 'Samantha Green', '1800 Spruce Ct, SF', '223-45-6789', 'receptionist'),
(6, 'Jason Baker', '1900 Aspen Way, SF', '234-56-7890', 'housekeeping'),
-- Hotel 7 employees (Miami 4-star)
(7, 'Andrew Mitchell', '2300 Palm Blvd, Miami', '678-92-1234', 'manager'),
(7, 'Stephanie Perez', '2400 Sequoia Rd, Miami', '789-21-2345', 'receptionist'),
(7, 'Joshua Roberts', '2500 Juniper Ln, Miami', '891-12-3456', 'housekeeping'),
-- Hotel 8 employees (Boston 3-star)
(8, 'Ryan Parker', '2900 Dogwood Ave, Boston', '234-56-7891', 'manager'),
(8, 'Rachel Evans', '3000 Hickory St, Boston', '345-67-8902', 'receptionist'),
(8, 'Nicholas Edwards', '3100 Willow Rd, Boston', '456-98-9012', 'housekeeping'),
-- Hotel 9 employees (Miami 5-star)
(9, 'Brandon Sanchez', '3400 Oak Ave, Miami', '789-31-2345', 'manager'),
(9, 'Danielle Morris', '3500 Pine Rd, Miami', '892-12-3456', 'receptionist'),
(9, 'Justin Rogers', '3600 Elm St, Miami', '991-23-4567', 'housekeeping'),
-- Hotel 10 employees (Miami 4-star)
(10, 'Samuel Murphy', '4100 Aspen Way, Miami', '456-88-9012', 'manager'),
(10, 'Victoria Bailey', '4200 Willow Rd, Miami', '567-89-1123', 'receptionist'),
(10, 'Frank Rivera', '4300 Magnolia Dr, Miami', '567-90-1234', 'housekeeping'),
-- Hotel 11 employees (San Diego 4-star)
(11, 'Peter Howard', '4700 Juniper Ln, San Diego', '312-34-5678', 'manager'),
(11, 'Evelyn Ward', '4800 Redbud Ave, San Diego', '323-45-6789', 'receptionist'),
(11, 'Aaron Torres', '4900 Hawthorn Dr, San Diego', '234-56-7892', 'housekeeping'),
-- Hotel 12 employees (Tampa 3-star)
(12, 'Keith James', '5300 Willow Rd, Tampa', '678-93-1234', 'manager'),
(12, 'Cheryl Watson', '5400 Magnolia Dr, Tampa', '789-41-2345', 'receptionist'),
(12, 'Ralph Brooks', '5500 Redwood Ln, Tampa', '893-12-3456', 'housekeeping'),
-- Hotel 13 employees (Santa Monica 4-star)
(13, 'Dennis Price', '5800 Juniper Ln, Santa Monica', '423-45-6789', 'manager'),
(13, 'Pamela Bennett', '5900 Redbud Ave, Santa Monica', '234-56-7893', 'receptionist'),
(13, 'Jerry Wood', '6000 Hawthorn Dr, Santa Monica', '345-67-8903', 'housekeeping'),
-- Hotel 14 employees (Clearwater 3-star)
(14, 'Ralph Coleman', '6400 Willow Rd, Clearwater', '789-51-2345', 'manager'),
(14, 'Shirley Jenkins', '6500 Magnolia Dr, Clearwater', '894-12-3456', 'receptionist'),
(14, 'Eugene Perry', '6600 Redwood Ln, Clearwater', '981-23-4567', 'housekeeping'),
-- Hotel 15 employees (Santa Barbara 5-star)
(15, 'Philip Hughes', '6900 Juniper Ln, Santa Barbara', '234-56-7894', 'manager'),
(15, 'Teresa Flores', '7000 Redbud Ave, Santa Barbara', '345-67-8904', 'receptionist'),
(15, 'Louis Washington', '7100 Hawthorn Dr, Santa Barbara', '456-68-9012', 'housekeeping'),
-- Hotel 16 employees (Myrtle Beach 3-star)
(16, 'Johnny Alexander', '7700 Redwood Ln, Myrtle Beach', '412-34-5678', 'manager'),
(16, 'Julie Russell', '7800 Palm Blvd, Myrtle Beach', '523-45-6789', 'receptionist'),
(16, 'Lawrence Griffin', '7900 Sequoia Rd, Myrtle Beach', '234-56-7895', 'housekeeping'),
-- Hotel 17 employees (Denver 4-star)
(17, 'Harry Myers', '8200 Hawthorn Dr, Denver', '567-89-0623', 'manager'),
(17, 'Mildred Ford', '8300 Sycamore Ln, Denver', '678-94-1234', 'receptionist'),
(17, 'Philip Hamilton', '8400 Dogwood Ave, Denver', '789-61-2345', 'housekeeping'),
-- Hotel 18 employees (Aspen 5-star)
(18, 'Earl Woods', '8800 Redwood Ln, Aspen', '623-45-6789', 'manager'),
(18, 'Beverly Cole', '8900 Palm Blvd, Aspen', '234-56-7896', 'receptionist'),
(18, 'Phillip West', '9000 Sequoia Rd, Aspen', '345-67-8905', 'housekeeping'),
-- Hotel 19 employees (Park City 4-star)
(19, 'Carl Gibson', '9600 Hickory St, Park City', '971-23-4567', 'manager'),
(19, 'Peggy Mcdonald', '9700 Willow Rd, Park City', '512-34-5678', 'receptionist'),
(19, 'Arthur Cruz', '9800 Magnolia Dr, Park City', '723-45-6789', 'housekeeping'),
-- Hotel 20 employees (Boulder 3-star)
(20, 'Jack Murray', '300 Juniper Ln, Boulder', '567-89-0523', 'manager'),
(20, 'Lois Freeman', '400 Redbud Ave, Boulder', '678-95-1234', 'receptionist'),
(20, 'Roger Wells', '500 Hawthorn Dr, Boulder', '789-71-2345', 'housekeeping'),
-- Hotel 21 employees (Vail 5-star)
(21, 'Ralph Johnston', '800 Hickory St, Vail', '612-34-5678', 'manager'),
(21, 'Tina Bishop', '900 Willow Rd, Vail', '823-45-6789', 'receptionist'),
(21, 'Eugene Meyer', '1000 Magnolia Dr, Vail', '234-56-7897', 'housekeeping'),
-- Hotel 22 employees (Sedona 4-star)
(22, 'Clarence Jensen', '1600 Hawthorn Dr, Sedona', '895-12-3456', 'manager'),
(22, 'Sue Montgomery', '1700 Sycamore Ln, Sedona', '961-23-4567', 'receptionist'),
(22, 'Dale Franklin', '1800 Dogwood Ave, Sedona', '712-34-5678', 'housekeeping'),
-- Hotel 23 employees (Lake Tahoe 3-star)
(23, 'Raymond Gutierrez', '2200 Redwood Ln, Lake Tahoe', '456-58-9012', 'manager'),
(23, 'Marian Sutton', '2300 Palm Blvd, Lake Tahoe', '567-89-0103', 'receptionist'),
(23, 'Leroy Obrien', '2400 Sequoia Rd, Lake Tahoe', '678-96-1234', 'housekeeping'),
-- Hotel 24 employees (Jackson Hole 4-star)
(24, 'Tommy Rios', '2700 Hawthorn Dr, Jackson Hole', '541-23-4567', 'manager'),
(24, 'Gwendolyn Douglas', '2800 Sycamore Ln, Jackson Hole', '812-34-5678', 'receptionist'),
(24, 'Lionel Byrd', '2900 Dogwood Ave, Jackson Hole', '923-45-6789', 'housekeeping'),
-- Hotel 25 employees (Chicago 4-star)
(25, 'Corey Spencer', '3300 Redwood Ln, Chicago', '567-89-0023', 'manager'),
(25, 'Loretta Gardner', '3400 Palm Blvd, Chicago', '678-97-1234', 'receptionist'),
(25, 'Kirk Poole', '3500 Sequoia Rd, Chicago', '789-81-2345', 'housekeeping'),
-- Hotel 26 employees (LA 3-star)
(26, 'Neal Patton', '3900 Sycamore Ln, LA', '133-45-6789', 'manager'),
(26, 'Gretchen Norton', '4000 Dogwood Ave, LA', '234-56-7898', 'receptionist'),
(26, 'Jimmie Figueroa', '4100 Hickory St, LA', '345-67-8906', 'housekeeping'),
-- Hotel 27 employees (NYC 5-star)
(27, 'Lance Malone', '4400 Redwood Ln, NYC', '678-98-1234', 'manager'),
(27, 'Dianne Hopkins', '4500 Palm Blvd, NYC', '789-91-2345', 'receptionist'),
(27, 'Clark Reeves', '4600 Sequoia Rd, NYC', '896-12-3456', 'housekeeping'),
-- Hotel 28 employees (Boston 3-star)
(28, 'Daryl Walsh', '5200 Hickory St, Boston', '456-48-9012', 'manager'),
(28, 'Elsa Chambers', '5300 Willow Rd, Boston', '537-89-0123', 'receptionist'),
(28, 'Ross Page', '5400 Magnolia Dr, Boston', '678-99-1234', 'housekeeping'),
-- Hotel 29 employees (San Francisco 4-star)
(29, 'Roderick Collier', '5700 Sequoia Rd, SF', '941-23-4567', 'manager'),
(29, 'Jenna Nash', '5800 Juniper Ln, SF', '912-34-5678', 'receptionist'),
(29, 'Damon Sharp', '5900 Redbud Ave, SF', '143-45-6789', 'housekeeping'),
-- Hotel 30 employees (Seattle 3-star)
(30, 'Earnest Swanson', '6300 Hickory St, Seattle', '567-89-0723', 'manager'),
(30, 'Eileen Noble', '6400 Willow Rd, Seattle', '678-10-1234', 'receptionist'),
(30, 'Rudy Moss', '6500 Magnolia Dr, Seattle', '789-02-2345', 'housekeeping'),
-- Hotel 31 employees (Philadelphia 4-star)
(31, 'Fredrick Padilla', '6800 Sequoia Rd, Philadelphia', '022-34-5678', 'manager'),
(31, 'Darla Joseph', '6900 Juniper Ln, Philadelphia', '153-45-6789', 'receptionist'),
(31, 'Moses Chan', '7000 Redbud Ave, Philadelphia', '234-56-7899', 'housekeeping'),
-- Hotel 32 employees (Washington DC 5-star)
(32, 'Roosevelt Hooper', '7400 Hickory St, DC', '678-20-1234', 'manager'),
(32, 'Maggie Mcintosh', '7500 Willow Rd, DC', '789-03-2345', 'receptionist'),
(32, 'Drew Casey', '7600 Magnolia Dr, DC', '897-12-3456', 'housekeeping'),
-- Hotel 33 employees (Boston 3-star)
(33, 'Wilson Daugherty', '8200 Hawthorn Dr, Boston', '456-38-9012', 'manager'),
(33, 'Kristine Meadows', '8300 Sycamore Ln, Boston', '567-09-0123', 'receptionist'),
(33, 'Rogelio Solomon', '8400 Dogwood Ave, Boston', '678-30-1234', 'housekeeping'),
-- Hotel 34 employees (Charleston 4-star)
(34, 'Rudy Vaughn', '8700 Magnolia Dr, Charleston', '931-23-4567', 'manager'),
(34, 'Della Espinoza', '8800 Redwood Ln, Charleston', '032-34-5678', 'receptionist'),
(34, 'Elias Bauer', '8900 Palm Blvd, Charleston', '163-45-6789', 'housekeeping'),
-- Hotel 35 employees (San Francisco 3-star)
(35, 'Dewayne Francis', '9300 Hawthorn Dr, SF', '567-39-0123', 'manager'),
(35, 'Lula Boone', '9400 Sycamore Ln, SF', '678-40-1234', 'receptionist'),
(35, 'Roosevelt Norman', '9500 Dogwood Ave, SF', '789-04-2345', 'housekeeping'),
-- Hotel 36 employees (NYC 5-star)
(36, 'Rudy Oconnor', '9800 Magnolia Dr, NYC', '042-34-5678', 'manager'),
(36, 'Jodi Bruce', '9900 Redwood Ln, NYC', '173-45-6789', 'receptionist'),
(36, 'Darin Lang', '100 Palm Blvd, NYC', '234-56-7810', 'housekeeping'),
-- Hotel 37 employees (Santa Fe 3-star)
(37, 'Wilson Henson', '700 Dogwood Ave, Santa Fe', '899-12-3456', 'manager'),
(37, 'Kristine Blankenship', '800 Hickory St, Santa Fe', '911-23-4567', 'receptionist'),
(37, 'Rogelio Keith', '900 Willow Rd, Santa Fe', '052-34-5678', 'housekeeping'),
-- Hotel 38 employees (Savannah 4-star)
(38, 'Rudy Cohen', '1200 Palm Blvd, Savannah', '345-67-8908', 'manager'),
(38, 'Della Mckay', '1300 Sequoia Rd, Savannah', '456-28-9012', 'receptionist'),
(38, 'Elias Hayden', '1400 Juniper Ln, Savannah', '367-89-0123', 'housekeeping'),
-- Hotel 39 employees (Denver 3-star)
(39, 'Dewayne Cantrell', '1800 Dogwood Ave, Denver', '921-23-4567', 'manager'),
(39, 'Lula Pittman', '1900 Hickory St, Denver', '012-34-5678', 'receptionist'),
(39, 'Roosevelt Ferrell', '2000 Willow Rd, Denver', '183-45-6789', 'housekeeping'),
-- Hotel 40 employees (St. Louis 4-star)
(40, 'Rudy Schmitt', '2300 Palm Blvd, St. Louis', '456-18-9012', 'manager'),
(40, 'Jodi Alvarado', '2400 Sequoia Rd, St. Louis', '527-89-0123', 'receptionist'),
(40, 'Darin Mcmillan', '2500 Juniper Ln, St. Louis', '678-90-1234', 'housekeeping');

-- Insert customers (50 customers)
INSERT INTO Customer (full_name, address, id_type, id_number) VALUES
('John Smith', '123 Main St, Anytown, USA', 'SSN', '245-678-912'),
('Emily Johnson', '456 Oak Ave, Somewhere, USA', 'SIN', '312-456-789'),
('Michael Williams', '789 Pine Rd, Nowhere, USA', 'Driver License', 'B1234-56789-012'),
('Sarah Brown', '101 Elm St, Anycity, USA', 'SSN', '579-123-654'),
('David Jones', '202 Maple Ave, Yourtown, USA', 'SIN', '693-845-231'),
('Jennifer Garcia', '303 Birch Lane, Theircity, USA', 'Driver License', 'K6789-12345-678'),
('Robert Miller', '404 Cedar Blvd, Ourville, USA', 'SSN', '428-967-312'),
('Jessica Davis', '505 Redwood Dr, Histown, USA', 'SIN', '379-214-876'),
('Thomas Rodriguez', '606 Spruce Way, Newtown, USA', 'Driver License', 'M4321-87654-901'),
('Lisa Martinez', '707 Aspen Ct, Oldville, USA', 'SSN', '621-395-847'),
('Daniel Hernandez', '808 Willow Ln, Nextcity, USA', 'SIN', '714-682-359'),
('Nancy Lopez', '909 Juniper Pl, Lasttown, USA', 'Driver License', 'L9876-54321-234');

-- Insert bookings (100 bookings)
INSERT INTO Booking (customer_id, room_id, check_in_date, check_out_date, status) VALUES
-- Active bookings
(1, 1, '2025-04-01', '2025-04-05', 'active'),
(2, 3, '2025-04-10', '2025-04-15', 'active'),
(3, 5, '2025-05-01', '2025-05-07', 'active'),
-- Completed bookings
(4, 21, '2025-01-01', '2025-01-05', 'completed'),
(5, 23, '2025-01-10', '2025-01-15', 'completed'),
(6, 25, '2025-01-20', '2025-01-25', 'completed'),
-- Canceled bookings
(7, 41, '2025-04-10', '2025-04-15', 'canceled'),
(8, 43, '2025-04-20', '2025-04-25', 'canceled'),
(9, 45, '2025-05-01', '2025-05-05', 'canceled'),
-- More bookings to reach 100
(10, 61, '2025-07-20', '2025-07-25', 'active'),
(11, 63, '2025-08-01', '2025-08-05', 'active'),
(12, 65, '2025-08-10', '2025-08-15', 'active');

-- Insert rentings
INSERT INTO Renting (booking_id, customer_id, room_id, employee_id, start_date, end_date)
SELECT b.booking_id, b.customer_id, b.room_id,
       (SELECT employee_id FROM Employee
        WHERE hotel_id = (SELECT hotel_id FROM Room WHERE room_id = b.room_id)
        ORDER BY RANDOM() LIMIT 1),
       b.check_in_date, b.check_out_date
FROM Booking b
WHERE b.status = 'active'
AND NOT EXISTS (
    SELECT 1 FROM Renting r
    WHERE r.room_id = b.room_id
    AND daterange(r.start_date, r.end_date) && daterange(b.check_in_date, b.check_out_date)
);
