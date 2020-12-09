import { AfterViewInit } from '@angular/core';
import { ViewChild, Component, OnInit, ElementRef, ViewChildren } from '@angular/core';
import * as d3 from 'd3';
import * as topojson from 'topojson';

@Component({
  selector: 'app-wayco',
  templateUrl: './wayco.component.html',
  styleUrls: ['./wayco.component.css']
})
export class WaycoComponent implements OnInit, AfterViewInit {
  errors = [];

  active;
  margin;
  g;
  path;
  width;
  height;
  @ViewChild('container', undefined) container;
  @ViewChild('map', undefined) map;

  constructor() { }

  ngOnInit() { }

  ngAfterViewInit() {
    this.draw();
  }

  draw() {
    Promise.resolve(d3.json('../../assets/us.json')).then((us: any) => {
      const margin = {
        top: 10,
        bottom: 10,
        left: 10,
        right: 10
      };

      let width = this.container.nativeElement.getBoundingClientRect().width;
      width = width - margin.left - margin.right;

      const mapRatio = 0.905;
      const height = width * mapRatio;

      this.active = d3.select(null);

      const svg = d3.select('.map').append('svg')
        .attr('class', 'center-container')
        .style('height', '100%')
        .style('width', '100%')
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", `0 0 ${width} ${height}`);

      const clicked = this.clicked;
      const that = this;

      svg.append('rect')
        .attr('class', 'background center-container')
        .attr('height', height + margin.top + margin.bottom)
        .attr('width', width + margin.left + margin.right)
        .style('fill', 'transparent')
        .on('click', function (e, d) {
          clicked(d, this, that, height, width, margin, path, g);
        });

      const projection = d3.geoAlbersUsa()
        .translate([width / 2, height / 2])
        .scale(width);

      const path = d3.geoPath().projection(projection);

      const g = svg.append('g')
        .attr('class', 'us-state svg-content-responsive')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom);

      g.append('g')
        .attr('id', 'counties')
        .selectAll('path')
        .data(topojson.feature(us, us.objects.counties)['features'])
        .enter().append('path')
        .attr('d', path)
        .attr('class', 'county-boundary')
        .on('click', (e, d) => this.reset(g, margin));


      g.append('g')
        .attr('id', 'states')
        .selectAll('path')
        .data(topojson.feature(us, us.objects.states)['features'])
        .enter().append('path')
        .attr('d', path)
        .attr('class', 'state')
        .on('click', function (e, d) {
          clicked(d, this, that, height, width, margin, path, g);
        });

      g.append('path')
        .datum(topojson.mesh(us, us.objects.states, function (a, b) { return a !== b; }))
        .attr('id', 'state-borders')
        .attr('d', path);
    });
  }

  reset(g, margin) {
    this.active.classed('active', false);
    this.active = d3.select(null);

    g.transition()
      .delay(100)
      .duration(750)
      .style('stroke-width', '1.5px')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
  }

  clicked(d, context, that, height, width, margin, path, g) {
    if (d3.select('.background').node() === context) {
      that.reset(g, margin);
      return;
    }

    if (that.active.node() === context) {
      that.reset(g, margin);
      return;
    }

    that.active.classed('active', false);
    that.active = d3.select(context).classed('active', true);

    let bounds = path.bounds(d);
    let dx = bounds[1][0] - bounds[0][0];
    let dy = bounds[1][1] - bounds[0][1];
    let x = (bounds[0][0] + bounds[1][0]) / 2;
    let y = (bounds[0][1] + bounds[1][1]) / 2;
    let scale = .9 / Math.max(dx / width, dy / height);
    let translate = [width / 2 - scale * x, height / 2 - scale * y];

    g.transition()
      .duration(750)
      .style('stroke-width', 1.5 / scale + 'px')
      .attr('transform', 'translate(' + translate + ')scale(' + scale + ')');
  }

  tooltip(d) {
    return '<h4> Click to view stats for ' + d.id + '</h4>';
  }
}
