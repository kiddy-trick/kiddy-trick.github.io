from PIL import Image
import os
import argparse

parser = argparse.ArgumentParser()
parser.add_argument('-s', '--source', help='source folder, defaults to current folder', default="")
parser.add_argument('-d', '--dest', help='destination folder, defaults to current folder', default="")
parser.add_argument('-w', '--width', help='list of image widths, format: -w 1000 800 600', type=int, nargs='+', default=[], required=True)
args = parser.parse_args()

source_folder = os.getcwd()

if args.source != "":
    if os.path.isabs(args.source):
        source_folder = args.source
    else:
        source_folder = os.path.abspath(args.source)

dest_folder = source_folder
if args.dest !="":
    raise NameError('[--dest | -d ] currently not working. Outputs to [--source | -s]')
    if os.path.isabs(args.dest):
        dest_folder = args.dest
    else:
        dest_folder = os.path.abspath(args.dest)

print(f'Source folder is: {source_folder}')
print(f'Dest folder is: {dest_folder}')
print(args.width)
width_list = args.width
width_list.sort(reverse=True)
max_width = width_list[0]
print(f'Maximum width is: {max_width}')

for root, dirs, files in os.walk(source_folder, topdown=False):
    for f in files:
        # print(os.path.join(root, f))
        f_name, f_ext = os.path.splitext(f)
        if f_ext in {'.jpg', '.png'} and not ("_" in f_name):
            #print(f_name)
            with Image.open(os.path.join(root, f)) as im:
                for width in width_list:
                    ratio = width / im.width
                    height = int(im.height * ratio)
                    new_size = (width, height)
                    print(new_size)
                    new_name = os.path.join(root, f'{f_name}_{width}w.jpg')
                    print(new_name)
                    new_image = im.resize(new_size, resample=Image.LANCZOS)
                    new_image.save(new_name, 'JPEG', quality=80, progressive=True)
