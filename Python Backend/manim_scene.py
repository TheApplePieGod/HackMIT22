from manim import *
import math
import re

def parsePolynomial(tex):
  s1 = re.sub(r'^y *= *', r'', tex)
  s2 = re.sub(r'\^', r'**', s1)
  s3 = re.sub(r'\\frac{(\d*)}{(\d*)}', r'(\1/\2)', s2)
  s4 = re.sub(r'{', r'(', s3)
  s5 = re.sub(r'}', r')', s4)
  s6 = re.sub(r'([\d\)])x', r'\1*x', s5)

  fnStr = 'lambda x : ' + s6
  return eval(fnStr), tex

def round_sig(x, sig):
  if x == 0: return x
  return round(x, sig - int(math.floor(math.log10(abs(x)))) - 1)

screen_width = '$$WIDTH$$'
screen_height = '$$HEIGHT$$'
plot_width = math.floor(screen_width * 0.8)
plot_height = math.floor(screen_height * 0.8 - 50)

config.frame_width = 5
config.frame_height = 5
config.background_color = WHITE

class Graph(Scene):
    def construct(self):
        fn, tex = parsePolynomial(r'$$TEX$$')

        xRange = [-10, 10, 1]

        y_min = round_sig(min(fn(x) for x in range(xRange[0], xRange[1] + 1)), 2)
        y_max = round_sig(max(fn(x) for x in range(xRange[0], xRange[1] + 1)), 2)
        print(y_min, y_max)
        y_spacing = (y_max - y_min) // 10
        # y_spacing = math.ceil((y_max-y_min) // 10 / 50) * 50

        yRange = [y_min, y_max, y_spacing]
        ax = Axes(
            x_range=xRange,
            x_length=(plot_width / 100),
            y_range=yRange, 
            y_length=(plot_height / 100),
            x_axis_config={"numbers_to_include": [-10, -5, 5, 10] },
            y_axis_config={"numbers_to_include": [y_min, y_max] },
            axis_config={"include_tip": False, "include_numbers": True, "font_size": 20, "color": BLACK }
        ).to_edge(DOWN)
        ax.set_fill(BLACK)

        
        # labels = ax.get_axis_labels(x_label="x", y_label="y")
        fn_plot = ax.plot(fn, color=BLUE)
        label = MathTex(tex, font_size=30, color=BLACK).next_to(ax, UP, buff=0.2)
        
        self.add(ax)
        # self.add(labels, text_size=20)
        self.add(label)
        self.play(Create(fn_plot), run_time = 5)
        self.wait()