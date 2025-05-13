import sys
sys.stdout.reconfigure(encoding='utf-8')
import json
import time
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager  

def scrape_devto_node_posts(limit=5):
    options = Options()
    options.add_argument("--headless")         
    options.add_argument("--disable-gpu")
    options.add_argument("--no-sandbox")

    service = Service(ChromeDriverManager().install())
    driver = webdriver.Chrome(service=service, options=options)

    try:
        url = "https://dev.to/search?q=node"
        driver.get(url)
        time.sleep(3)
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        time.sleep(2)

        wait = WebDriverWait(driver, 10)
        container = wait.until(EC.presence_of_element_located(
            (By.CSS_SELECTOR, "div#substories.substories.search-results-loaded")
        ))

        article_cards = container.find_elements(By.CSS_SELECTOR, "article.crayons-story")[:limit]

        posts = []
        for card in article_cards:
            try:
                title_elem = card.find_element(By.CSS_SELECTOR, "h3.crayons-story__title a")
                title = title_elem.text.strip()
                link = title_elem.get_attribute("href")
                posts.append({
                    "title": title,
                    "link": link
                })
            except Exception as e:
                print(f"Erro ao extrair título e link: {e}", file=sys.stderr)

        for post in posts:
            try:
                driver.get(post["link"])
                time.sleep(2)
                article_body = WebDriverWait(driver, 10).until(
                    EC.presence_of_element_located((By.CSS_SELECTOR, "div#article-body"))
                )
                full_text = article_body.text.strip()
                post["content"] = full_text

                try:
                    cover_elem = driver.find_element(
                        By.CSS_SELECTOR, 
                        "header.crayons-article__header a.crayons-article__cover"
                    )
                    cover_image = cover_elem.get_attribute("href")
                except Exception:
                    cover_image = ""
                post["cover_image"] = cover_image
            except Exception as e:
                print(f"Erro ao extrair conteúdo do artigo ({post['link']}): {e}", file=sys.stderr)
                post["content"] = ""
                post["cover_image"] = ""

        return posts
    except Exception as ex:
        print(f"Erro durante o scraping: {ex}", file=sys.stderr)
        return []
    finally:
        driver.quit()

def main():
    posts = scrape_devto_node_posts(limit=5)
    if not posts:
        print("Nenhum post encontrado.", file=sys.stderr)
        sys.exit(1)
    print(json.dumps(posts, indent=4, ensure_ascii=False))

if __name__ == "__main__":
    main()