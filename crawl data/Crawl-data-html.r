library(rvest)
library(readr)

# Crawl dữ liệu từ trang web Amazon (thay link url web)
url <- "https://www.amazon.com/s?k=laptop"
page <- read_html(url)
#phần này crawl những thông tin mình cần
# Lấy tên của các sản phẩm
product_names <- page %>%
  html_nodes(".s-line-clamp-2") %>%
  html_text()

# Lấy giá của các sản phẩm
product_prices <- page %>%
  html_nodes(".a-price-whole") %>%
  html_text()

# Kiểm tra số lượng tên và giá sản phẩm
num_names <- length(product_names)
num_prices <- length(product_prices)

# Chọn số lượng chung nhỏ nhất giữa tên và giá sản phẩm
num_common <- min(num_names, num_prices)

# Tạo data frame từ dữ liệu đã thu thập
product_data <- data.frame(Name = product_names[1:num_common], Price = product_prices[1:num_common])


# Lưu dữ liệu vào file CSV
write_csv(product_data, "amazon_product_data.csv")
# Lưu data frame vào tệp văn bản
write.table(product_data, "amazon_product_data.txt", sep = "\t", row.names = FALSE)

