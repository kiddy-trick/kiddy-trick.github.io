import csv
import inspect
import textwrap
import os

__location__ = os.path.realpath(os.path.join(os.getcwd(), os.path.dirname(__file__)))

with open(os.path.join(__location__, 'kiddy.csv'), 'r', encoding='utf-8') as csv_file:
    csv_reader = csv.DictReader(csv_file)

    for line in csv_reader:
        
        if line['product-price'] != "":
            price_num = int(line['product-price'])
        else:
            price_num = 1488
        price_str = '{:,}'.format(price_num).replace(',', ' ')
        product_description = line['product-description'].strip().replace('\n', '<br />')

        redirect_urls = line['redirects'].split(';')
        
        redirect_text = ''
        if redirect_urls[0]:
            redirect_text = 'redirect_from:\n'
            for redirect in redirect_urls:
                redirect_text += '  - ' + redirect[22:] + '\n'
            print(redirect_text)
       
        file_content = ""
        file_content = f"""\
        ---
        title: '{line['title'].strip()}'
        description: '{line['description'].strip()}'

        layout: product
        permalink: /:path
        image: /images/catalog/{line['category']}/{line['url']}-01_1600w.jpg
        type: product

        weight: {line['weight']}
        featured: {line['featured']}
        new: {line['new']}

        product-title: '{line['product-title'].strip()}'
        product-description: '{product_description}'
        product-price: '{price_str.strip()}'

        feature-age: '{line['feature-age']}'
        feature-size: '{line['feature-size']}'
        feature-time: '{line['feature-time']}'

        product-video: {line['product-video'].split('/')[-1]}
        

        """
        
        file_content = inspect.cleandoc(file_content)
                
        # related = line['related'].split("/")
       
        # if related[0] != '':
        #     file_content += '\nrelated:\n'
        #     for rel in related:
        #         file_content += f'- {rel.strip()}\n'

        file_content += '\n' + redirect_text
        file_content += '\n---\n'

        file_content += line['product-description']

        print(file_content)
        file_name = line['url'] + '.md'
        file_name = os.path.join(__location__, line['category'], file_name)
        if not os.path.exists(os.path.join(__location__, line['category'])):
            os.mkdir(os.path.join(__location__, line['category']))

        print(file_name)

        with open(file_name, 'w', encoding='utf-8') as md_file:
            md_file.write(file_content)