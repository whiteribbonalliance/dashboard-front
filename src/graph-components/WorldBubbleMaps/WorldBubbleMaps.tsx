'use client'

import { Box } from '@components/Box'
import { GraphTitle } from '@components/GraphTitle'
import { useCampaignQuery } from '@hooks/use-campaign'
import { GraphError } from '@components/GraphError'
import { GraphLoading } from '@components/GraphLoading'
import * as d3 from 'd3'
import { DashboardName } from '@enums'
import { midwivesVoicesConfig, whatWomenWantConfig, whatYoungPeopleWantConfig } from '@configurations'
import React, { useEffect, useMemo, useRef } from 'react'
import { IWorldBubbleMapsCoordinate } from '@interfaces'
import { Tab } from '@headlessui/react'
import { classNames } from '@utils'
import { useQuery } from 'react-query'
import { IFiltersState, useFiltersStore } from '@stores/filters'

interface IWorldBubbleMapsProps {
    dashboard: string
    lang: string
}

interface IWorldBubbleMapProps {
    dashboard: string
    respondents: string
    dataGeo: IDataGeo
    bubbleMapCoordinates: IWorldBubbleMapsCoordinate[]
    colorId: 'color1' | 'color2'
}

interface IDataGeo {
    features: {
        type: string
        properties: { name: string }
        geometry: {
            type: string
            coordinates: number[][][]
        }
    }[]
    type: string
}

// svg dimensions
const svgWidth = 900
const svgHeight = 600

export const WorldBubbleMaps = ({ dashboard, lang }: IWorldBubbleMapsProps) => {
    const { data, isError } = useCampaignQuery(dashboard, lang)

    // Set respondents
    let respondents: string
    switch (dashboard) {
        case DashboardName.WHAT_WOMEN_WANT:
            respondents = whatWomenWantConfig.respondentsNounPlural
            break
        case DashboardName.WHAT_YOUNG_PEOPLE_WANT:
            respondents = whatYoungPeopleWantConfig.respondentsNounPlural
            break
        case DashboardName.MIDWIVES_VOICES:
            respondents = midwivesVoicesConfig.respondentsNounPlural
            break
        default:
            respondents = 'respondents'
    }

    // Data geo query
    const dataGeoQuery = useQuery<IDataGeo | undefined>({
        queryKey: ['data-geo'],
        queryFn: () =>
            d3.json<IDataGeo>('https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson'),
        refetchOnWindowFocus: false,
    })

    // Tabs
    const tabs = [
        {
            id: 'world-bubble-map-1',
            title: data ? data.filter_1_description : '',
            content:
                data && dataGeoQuery.data ? (
                    <WorldBubbleMap
                        dashboard={dashboard}
                        respondents={respondents}
                        dataGeo={dataGeoQuery.data}
                        bubbleMapCoordinates={data.world_bubble_maps_coordinates.coordinates_1}
                        colorId="color1"
                    />
                ) : null,
        },
    ]

    // Add world bubble maps 2 if filters are not identical
    if (data && dataGeoQuery.data) {
        if (!data.filters_are_identical) {
            tabs.push({
                id: 'world-bubble-map-2',
                title: data.filter_2_description,
                content: (
                    <WorldBubbleMap
                        dashboard={dashboard}
                        respondents={respondents}
                        dataGeo={dataGeoQuery.data}
                        bubbleMapCoordinates={data.world_bubble_maps_coordinates.coordinates_2}
                        colorId="color2"
                    />
                ),
            })
        }
    }

    // Set selected tab classes
    let selectedTabClasses: string
    switch (dashboard) {
        case DashboardName.WHAT_YOUNG_PEOPLE_WANT:
            selectedTabClasses = 'border-t-pmnchColors-septenary'
            break
        default:
            selectedTabClasses = 'border-t-defaultColors-tertiary'
    }

    // Display world bubble maps or not
    const displayWorldBubbleMaps = !!data && !!dataGeoQuery.data

    return (
        <Box>
            <GraphTitle dashboard={dashboard} text={`Where are the ${respondents} located?`} />
            <p>
                Click on a bubble to view country information. Each bubble is sized according to the number of people.
            </p>

            {/* Error */}
            {!data && isError && <GraphError dashboard={dashboard} />}

            {/* Loading (only at first data fetch) */}
            {!displayWorldBubbleMaps && !isError && <GraphLoading dashboard={dashboard} />}

            {/* World bubble maps */}
            {displayWorldBubbleMaps && (
                <div className="mt-3 w-full">
                    <Tab.Group>
                        <Tab.List className="flex flex-col sm:flex-row">
                            {tabs.map((tab) => (
                                <Tab
                                    key={tab.id}
                                    className={({ selected }) =>
                                        classNames(
                                            'w-full bg-grayLighter py-5 leading-5 shadow-sm ring-transparent ring-offset-2 focus:outline-none',
                                            selected ? `border-t-2 bg-white shadow-none ${selectedTabClasses}` : ''
                                        )
                                    }
                                >
                                    {tab.title}
                                </Tab>
                            ))}
                        </Tab.List>
                        <Tab.Panels>
                            {tabs.map(({ id, content }) => (
                                <Tab.Panel key={id} className="w-full">
                                    {content}
                                </Tab.Panel>
                            ))}
                        </Tab.Panels>
                    </Tab.Group>
                </div>
            )}
        </Box>
    )
}

const WorldBubbleMap = ({ dashboard, respondents, dataGeo, bubbleMapCoordinates, colorId }: IWorldBubbleMapProps) => {
    const filters = useFiltersStore((state: IFiltersState) => state.filters)
    const setFilters = useFiltersStore((state: IFiltersState) => state.setFilters)

    const svgRef = useRef<SVGSVGElement>(undefined as any)
    const divRef = useRef<HTMLDivElement>(undefined as any)

    // Set bubble color 1 and bubble color 2
    let bubbleColor1: string
    let bubbleColor2: string
    switch (dashboard) {
        case DashboardName.WHAT_YOUNG_PEOPLE_WANT:
            bubbleColor1 = 'var(--pmnchTertiary)'
            bubbleColor2 = 'var(--pmnchPrimary)'
            break
        default:
            bubbleColor1 = 'var(--defaultTertiary)'
            bubbleColor2 = 'var(--defaultQuaternary)'
    }

    // Color for bubble in map
    const bubbleColor = useMemo(() => {
        switch (colorId) {
            case 'color1':
                return bubbleColor1
            case 'color2':
                return bubbleColor2
        }
    }, [colorId, bubbleColor1, bubbleColor2])

    // Draw the world bubble map
    useEffect(() => {
        async function drawWorldBubbleMap() {
            // Remove Antarctica from geo
            // dataGeo.features = dataGeo.features.filter((d) => d.properties.name !== 'Antarctica')

            // Get svg element
            const svgEl = d3
                .select(svgRef.current)
                //.attr("height", svgHeight)
                .attr('preserveAspectRatio', 'xMidYMid meet')
                .attr('viewBox', `0 -125 ${svgWidth} ${svgHeight}`)

            // Clear svg content before adding new elements
            svgEl.selectAll('*').remove()

            // Remove the tooltip if it exists
            const divTooltip = document.getElementById('bubble-map-tooltip')
            if (divTooltip) {
                divTooltip.remove()
            }

            // Map and projection
            const projection = d3
                .geoMercator()
                .scale(144)
                .translate([svgWidth / 2, svgHeight / 2])

            //  Scale for bubble size
            const valueExtent: any = d3.extent(bubbleMapCoordinates, (d: IWorldBubbleMapsCoordinate) => +d.n)

            // Circle size
            const circleSize = d3.scaleSqrt().domain(valueExtent).range([7, 17])

            // Draw the map
            svgEl
                .append('g')
                .selectAll('path')
                .data(dataGeo.features)
                .join('path')
                .attr('fill', '#b8b8b8')
                .attr('d', d3.geoPath().projection(projection) as any)
                .style('stroke', 'none')
                .style('opacity', 0.3)

            // Tooltip
            const tooltip = d3
                .select(`#${divRef.current.id}`)
                .append('div')
                .attr('id', 'bubble-map-tooltip')
                .style('opacity', 0)
                .style('color', 'text-white')
                .style('position', 'absolute')
                .style('z-index', '9999')
                .style('background-color', 'red')
                .style('word-wrap', 'break-word')
                .style('padding', '0.2rem 0.4rem')
                .style('border-radius', '5px')
                .style('color', 'var(--white)')

            // On mouse over
            const onMouseOver = () => tooltip.style('opacity', 1)

            // On mouse move
            const onMouseMove = (event: MouseEvent, d: IWorldBubbleMapsCoordinate) =>
                tooltip
                    .html(d.country_name + '<br>' + d.n + ' ' + respondents)
                    .style('left', `${event.offsetX}px`)
                    .style('top', `${event.offsetY - 85}px`)
                    .style('background-color', bubbleColor)
                    .style('font-weight', 'bold')
                    .style('display', 'block')

            // On mouse leave
            const onMouseLeave = () => tooltip.style('opacity', 0).style('display', 'none')

            // On click (show country info)
            const onClick = (e: MouseEvent, d: IWorldBubbleMapsCoordinate) => {
                // if (filters.filter1.countries.length < 1) {
                //     // TODO: change in filter
                //     // TODO: do similar in top words
                //     // TODO: do similar on breakdown response topics
                // }
            }

            // Add circles
            svgEl
                .selectAll('myCircles')
                .data(bubbleMapCoordinates)
                .join('circle')
                .attr('class', 'bubble-map-circle')
                .attr('cx', (d: IWorldBubbleMapsCoordinate) => {
                    const point = projection([d.lon, d.lat])
                    if (point) return point[0]
                    return 0
                })
                .attr('cy', (d: IWorldBubbleMapsCoordinate) => {
                    const point = projection([d.lon, d.lat])
                    if (point) return point[1]
                    return 0
                })
                .attr('r', (d: IWorldBubbleMapsCoordinate) => circleSize(d.n))
                .style('fill', (d: IWorldBubbleMapsCoordinate) => bubbleColor)
                .attr('stroke', () => 'var(--white)')
                .attr('stroke-width', 1)
                .attr('fill-opacity', 0.4)
                .on('mouseover', onMouseOver)
                .on('mousemove', onMouseMove)
                .on('mouseleave', onMouseLeave)
                .on('click', onClick)
        }

        drawWorldBubbleMap().then()
    }, [dataGeo, bubbleMapCoordinates, bubbleColor, respondents])

    return (
        <div ref={divRef} id="bubble-map" className="relative h-full w-full">
            <svg ref={svgRef} width="100%" style={{ backgroundColor: 'var(--white)' }} />
        </div>
    )
}
