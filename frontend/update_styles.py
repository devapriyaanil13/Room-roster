import os
import re

css_dir = r"d:\MERN_STACK\PROJECT\Room_roster\frontend\src\styles"
global_css = r"d:\MERN_STACK\PROJECT\Room_roster\frontend\src\index.css"

def replace_in_file(filepath):
    if not os.path.exists(filepath): return
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 1. Fonts standardisation
    content = re.sub(r"@import url\('https://fonts\.googleapis\.com.*?Cormorant\+Garamond.*?display=swap'\);", 
                     "@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;700&display=swap');", content)
    
    content = re.sub(r"font-family:\s*['\"]Cormorant Garamond['\"],\s*serif;", "font-family: 'DM Sans', sans-serif;", content)
    content = re.sub(r"font-family:\s*Arial,\s*sans-serif;", "font-family: 'DM Sans', sans-serif;", content)
    
    # 2. Main Variables (used in Login, AddPG, Profile)
    variables_dark = r"--bg: #0e0e0e;.*?--input-bg-focus: rgba\(232, 162, 39, 0\.04\);"
    variables_pastel = """--bg: #fdfbf7;
  --surface: #ffffff;
  --border: #f0e6e6;
  --border-focus: #ffb7b2;
  --accent: #ffb7b2;
  --accent-glow: rgba(255, 183, 178, 0.25);
  --accent-glow-strong: rgba(255, 183, 178, 0.4);
  --text-primary: #4a4a4a;
  --text-muted: #888888;
  --text-placeholder: #bbbbbb;
  --input-bg: #fefcfc;
  --input-bg-focus: rgba(255, 183, 178, 0.05);"""
    
    content = re.sub(variables_dark, variables_pastel, content, flags=re.DOTALL)
    
    # 3. Navbar Variables
    nav_dark = r"--nav-bg: #0e0e0e;.*?--link-hover: #ffffff;"
    nav_pastel = """--nav-bg: #ffffff;
  --nav-border: #f0e6e6;
  --accent: #ffb7b2;
  --accent-glow: rgba(255, 183, 178, 0.18);
  --text-primary: #4a4a4a;
  --text-muted: #888888;
  --link-hover: #ffb7b2;"""
    content = re.sub(nav_dark, nav_pastel, content, flags=re.DOTALL)
    content = re.sub(r"background: rgba\(14, 14, 14, 0\.88\);", "background: rgba(255, 255, 255, 0.88);", content)
    
    # 4. Standalone Colors (Home, Dashboard, Roommates, Chat)
    # Backgrounds
    content = re.sub(r"background:\s*#0e0e0e;", "background: var(--bg, #fdfbf7);", content)
    content = re.sub(r"background:\s*#f4f6fb;", "background: #fdfbf7;", content)
    content = re.sub(r"background:\s*#111;", "background: #ffb7b2;", content)
    content = re.sub(r"background:\s*#3b82f6;", "background: #ffb7b2;", content)
    content = re.sub(r"background:\s*#e8a227;", "background: #ffb7b2;", content)
    # Colors
    content = re.sub(r"color:\s*#e8a227;", "color: #ffb7b2;", content)
    content = re.sub(r"color:\s*#f0ece4;", "color: #4a4a4a;", content)
    content = re.sub(r"color:\s*white;", "color: #ffffff;", content)
    # Hover states
    content = re.sub(r"background:\s*#f0aa2e;", "background: #ff9e99;", content)
    content = re.sub(r"background:\s*#d49121;", "background: #ff9e99;", content)
    content = re.sub(r"background:\s*#333;", "background: #ff9e99;", content)
    # Gradients
    content = re.sub(r"radial-gradient\(ellipse,\s*rgba\(232, 162, 39, 0\.055\)", "radial-gradient(ellipse, rgba(255, 183, 178, 0.15)", content)
    
    # 5. Box shadow fixes for pastel (softer shadows)
    content = re.sub(r"rgba\(0, 0, 0, 0\.6\)", "rgba(0, 0, 0, 0.08)", content)
    content = re.sub(r"rgba\(0, 0, 0, 0\.4\)", "rgba(0, 0, 0, 0.04)", content)
    content = re.sub(r"border:\s*1px solid rgba\(255, 255, 255, 0\.07\);", "border: 1px solid #f0e6e6;", content)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

for filename in os.listdir(css_dir):
    if filename.endswith(".css"):
        replace_in_file(os.path.join(css_dir, filename))

print("CSS Replacement Complete!")
