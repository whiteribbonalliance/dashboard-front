'use client'

import { Box } from '@components/Box'
import { GraphTitle } from '@components/GraphTitle'
import { useCampaignQuery } from '@hooks/use-campaign-query'
import { GraphError } from '@components/GraphError'
import { Loading } from 'components/Loading'
import * as d3 from 'd3'
import { LegacyDashboardName } from '@enums'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { IWorldBubbleMapsCoordinate } from '@interfaces'
import { classNames, getDashboardConfig, toThousandsSep } from '@utils'
import { useQuery } from 'react-query'
import { useTranslation } from '@app/i18n/client'
import { useFilterFormsStore } from '@stores/filter-forms'
import { UseFormReturn } from 'react-hook-form'
import { TFilter } from '@schemas/filter'
import { TDashboard } from '@types'
import { Tooltip } from '@components/Tooltip'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons'
import { feature } from 'topojson-client'
import { Topology } from 'topojson-specification'
import { FeatureCollection } from 'geojson'
import _ from 'lodash'
import { ParamsContext } from '@contexts/params'

interface IWorldBubbleMapsCoordinateWithExtra extends IWorldBubbleMapsCoordinate {
    coordinatesSequence: 'coordinates_1' | 'coordinates_2'
    color: string
}

interface ID3MapProps {
    dashboard: TDashboard
    form1: UseFormReturn<TFilter>
    form2: UseFormReturn<TFilter>
    respondents: string
    geoJsonFeatures: FeatureCollection
    topoJsonMX: Topology
    worldBubbleMapsCoordinates1?: IWorldBubbleMapsCoordinate[]
    worldBubbleMapsCoordinates2?: IWorldBubbleMapsCoordinate[]
    bubbleColor1: string
    bubbleColor2: string
    lang: string
}

// svg dimensions
const svgWidth = 900
const svgHeight = 600

export const WorldBubbleMap = () => {
    const { params } = useContext(ParamsContext)
    const { dashboard, lang } = params

    const { data, isError, isLoading, isRefetching } = useCampaignQuery()

    const [showBubbles1, setShowBubbles1] = useState<boolean>(true)
    const [showBubbles2, setShowBubbles2] = useState<boolean>(true)

    const { t } = useTranslation(lang)

    const form1 = useFilterFormsStore((state) => state.form1)
    const form2 = useFilterFormsStore((state) => state.form2)

    const config = getDashboardConfig(dashboard)

    // Set respondents
    const respondents = t(config.respondentsNounPlural)

    // Data geo world query
    const dataGeoQuery = useQuery<FeatureCollection | undefined>({
        queryKey: [`geo-world`],
        queryFn: () =>
            d3.json<FeatureCollection>(
                'https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson'
            ),
        refetchOnWindowFocus: false,
    })

    // Data topo JSON Mexico
    const dataTopoJsonMX = useQuery<Topology | undefined>({
        queryKey: [`topo-json-mx`],
        queryFn: () =>
            d3.json<Topology>(
                'https://gist.githubusercontent.com/diegovalle/5129746/raw/c1c35e439b1d5e688bca20b79f0e53a1fc12bf9e/mx_tj.json'
            ),
        refetchOnWindowFocus: false,
    })

    // Set respondents located text
    let respondentsLocatedText: string
    switch (dashboard) {
        case LegacyDashboardName.WHAT_WOMEN_WANT:
            respondentsLocatedText = t(`${config.campaignCode}-where-located`)
            break
        case LegacyDashboardName.ECONOMIC_EMPOWERMENT_MEXICO:
            respondentsLocatedText = t(`${config.campaignCode}-where-located`)
            break
        default:
            respondentsLocatedText = t('where-located')
    }

    // Set bubble color 1 and bubble color 2
    let bubbleColor1: string
    let bubbleColor2: string
    switch (dashboard) {
        case LegacyDashboardName.WHAT_YOUNG_PEOPLE_WANT:
            bubbleColor1 = 'var(--pmnchSecondary)'
            bubbleColor2 = 'var(--pmnchTertiary)'
            break
        default:
            bubbleColor1 = 'var(--defaultPrimary)'
            bubbleColor2 = 'var(--defaultTertiary)'
    }

    // Display world bubble maps or not
    const displayWorldBubbleMaps =
        !!data && !isLoading && !isRefetching && !!dataGeoQuery.data && !!dataTopoJsonMX.data && !!form1 && !!form2

    return (
        <div>
            {/* Tooltip: where are the respondents located */}
            <Tooltip
                id="respondents-located"
                dashboard={dashboard}
                title={'Map view'}
                paragraphs={[
                    'Here you can see where the respondents were located geographically. The size of the bubbles indicates how many respondents were from that country or region proportionally.',
                    'If you mouse-over any of the bubbles, it will tell you how many respondents were in that country or region.',
                    'If you click on a bubble, the Dashboard will filter for responses from that country or region.',
                ]}
            />

            <Box>
                <div data-tooltip-id="respondents-located">
                    <GraphTitle dashboard={dashboard} text={respondentsLocatedText} />
                </div>
                <p>
                    {t('click-bubble-country-information')} {t('each-bubble-sized-number-people')}
                </p>

                {/* Error */}
                {!data && isError && <GraphError dashboard={dashboard} />}

                {/* Loading */}
                {!displayWorldBubbleMaps && !isError && <Loading dashboard={dashboard} />}

                {/* World bubble maps */}
                {displayWorldBubbleMaps && (
                    <div className="mb-3 mt-3 w-full bg-white">
                        {/* Toggles to show/hide bubbles */}
                        <div className="flex flex-col gap-y-1 px-3 py-3">
                            <div
                                className={classNames('flex w-fit cursor-pointer', showBubbles1 ? '' : 'opacity-60')}
                                onClick={() => setShowBubbles1((prev) => !prev)}
                            >
                                <div className="mr-3 flex items-center justify-center">
                                    <FontAwesomeIcon icon={faCircle} style={{ color: bubbleColor1 }} />
                                </div>
                                <p>{data.filter_1_description}</p>
                            </div>

                            {!data.filters_are_identical && (
                                <div
                                    className={classNames(
                                        'flex w-fit cursor-pointer',
                                        showBubbles2 ? '' : 'opacity-60'
                                    )}
                                    onClick={() => setShowBubbles2((prev) => !prev)}
                                >
                                    <div className="mr-3 flex items-center justify-center">
                                        <FontAwesomeIcon icon={faCircle} style={{ color: bubbleColor2 }} />
                                    </div>
                                    <p>{data.filter_2_description}</p>
                                </div>
                            )}
                        </div>

                        {/* Map */}
                        <D3Map
                            dashboard={dashboard}
                            form1={form1}
                            form2={form2}
                            respondents={respondents}
                            geoJsonFeatures={_.cloneDeep(dataGeoQuery.data) as FeatureCollection}
                            topoJsonMX={dataTopoJsonMX.data as Topology}
                            worldBubbleMapsCoordinates1={
                                showBubbles1 ? data.world_bubble_maps_coordinates.coordinates_1 : undefined
                            }
                            worldBubbleMapsCoordinates2={
                                !data.filters_are_identical && showBubbles2
                                    ? data.world_bubble_maps_coordinates.coordinates_2
                                    : undefined
                            }
                            bubbleColor1={bubbleColor1}
                            bubbleColor2={bubbleColor2}
                            lang={lang}
                        />
                    </div>
                )}
            </Box>
        </div>
    )
}

const D3Map = ({
    dashboard,
    form1,
    form2,
    respondents,
    geoJsonFeatures,
    topoJsonMX,
    worldBubbleMapsCoordinates1,
    worldBubbleMapsCoordinates2,
    bubbleColor1,
    bubbleColor2,
    lang,
}: ID3MapProps) => {
    const svgRef = useRef<SVGSVGElement>(undefined as any)
    const divRef = useRef<HTMLDivElement>(undefined as any)

    // Draw the world bubble map
    useEffect(() => {
        async function drawWorldBubbleMap() {
            // Set view box
            let viewBox = `0 -125 ${svgWidth} ${svgHeight}`
            if (
                dashboard === LegacyDashboardName.WHAT_WOMEN_WANT_PAKISTAN ||
                dashboard === LegacyDashboardName.ECONOMIC_EMPOWERMENT_MEXICO
            ) {
                viewBox = `0 0 ${svgWidth} ${svgHeight}`
            }

            // Get svg element
            const svgEl = d3
                .select(svgRef.current)
                .attr('preserveAspectRatio', 'xMidYMid meet')
                .attr('viewBox', viewBox)

            // Clear svg content before adding new elements
            svgEl.selectAll('*').remove()

            // Remove the tooltip if it exists
            const divTooltip = document.getElementById('bubble-map-tooltip')
            if (divTooltip) {
                divTooltip.remove()
            }

            // Map and projection
            const projection = d3.geoMercator().translate([svgWidth / 2, svgHeight / 2])

            // Zoom on map
            if (dashboard === LegacyDashboardName.ECONOMIC_EMPOWERMENT_MEXICO) {
                projection
                    .center([-99.1, 19.25]) // GPS of location of Mexico City to zoom on
                    .scale(38000) // Zoom
            } else if (dashboard === LegacyDashboardName.WHAT_WOMEN_WANT_PAKISTAN) {
                projection
                    .center([70, 30.5]) // GPS of location of Pakistan to zoom on
                    .scale(2000) // Zoom
            } else {
                projection.scale(144) // Zoom
            }

            // For 'wwwpakistan', only show the respective country on the map (GeoJSON)
            switch (dashboard) {
                case LegacyDashboardName.WHAT_WOMEN_WANT_PAKISTAN:
                    geoJsonFeatures.features = geoJsonFeatures.features.filter((d) => d.properties?.name === 'Pakistan')
                    break
                case LegacyDashboardName.ECONOMIC_EMPOWERMENT_MEXICO:
                    // Uses TopoJSON
                    // dataGeo.features = dataGeo.features.filter((d) => d.properties.name === 'Mexico')
                    break
            }

            // Hide antarctica
            geoJsonFeatures.features = geoJsonFeatures.features.filter((d) => d.properties?.name !== 'Antarctica')

            // This variable will be used for the coordinates on the map
            let worldBubbleMapsCoordinates: IWorldBubbleMapsCoordinateWithExtra[]

            // Set colors for world bubble maps coordinates 1
            let worldBubbleMapsCoordinatesWithColors1: IWorldBubbleMapsCoordinateWithExtra[] = []
            if (worldBubbleMapsCoordinates1) {
                worldBubbleMapsCoordinatesWithColors1 = worldBubbleMapsCoordinates1.map((c) => {
                    return {
                        ...c,
                        color: bubbleColor1,
                        coordinatesSequence: 'coordinates_1',
                    } as IWorldBubbleMapsCoordinateWithExtra
                })
            }

            // Set colors for world bubble maps coordinates 2
            let worldBubbleMapsCoordinatesWithColors2: IWorldBubbleMapsCoordinateWithExtra[] = []
            if (worldBubbleMapsCoordinates2) {
                worldBubbleMapsCoordinatesWithColors2 = worldBubbleMapsCoordinates2.map((c) => {
                    return {
                        ...c,
                        color: bubbleColor2,
                        coordinatesSequence: 'coordinates_2',
                    } as IWorldBubbleMapsCoordinateWithExtra
                })
            }

            // Merge the world bubble maps coordinates
            worldBubbleMapsCoordinates = worldBubbleMapsCoordinatesWithColors1.concat(
                worldBubbleMapsCoordinatesWithColors2
            )

            //  Scale for bubble size
            const valueExtent: any = d3.extent(
                worldBubbleMapsCoordinates,
                (d: IWorldBubbleMapsCoordinateWithExtra) => +d.n
            )

            // Circle size
            const circleSize = d3.scaleSqrt().domain(valueExtent).range([7, 17])

            // Path
            const path = d3.geoPath().projection(projection) as any

            // Draw the map
            const fillColor = '#b7b7b7'
            switch (dashboard) {
                case LegacyDashboardName.ECONOMIC_EMPOWERMENT_MEXICO:
                    // Use topoJSON for Mexico
                    svgEl
                        .append('path')
                        .datum(feature(topoJsonMX, topoJsonMX.objects.states))
                        .attr('fill', () => fillColor)
                        .attr('stroke', '#ffffff')
                        .attr('d', path)
                    break
                default:
                    // Use GeoJSON
                    svgEl
                        .append('g')
                        .selectAll('path')
                        .data(geoJsonFeatures.features)
                        .join('path')
                        .attr('fill', fillColor)
                        .style('stroke', 'none')
                        .attr('d', path)
            }

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
            const onMouseMove = (event: MouseEvent, d: IWorldBubbleMapsCoordinateWithExtra) =>
                tooltip
                    .html(d.location_name + '<br>' + toThousandsSep(d.n, lang) + ' ' + respondents)
                    .style('left', `${event.offsetX}px`)
                    .style('top', `${event.offsetY - 85}px`)
                    .style('background-color', d.color)
                    .style('font-weight', 'bold')
                    .style('display', 'block')

            // On mouse leave
            const onMouseLeave = () => tooltip.style('opacity', 0).style('display', 'none')

            // On click (show country or region info)
            const onClick = (e: MouseEvent, d: IWorldBubbleMapsCoordinateWithExtra) => {
                let form: UseFormReturn<TFilter>
                if (d.coordinatesSequence == 'coordinates_1') {
                    form = form1
                } else {
                    form = form2
                }
                const currentRegionsValues = form.getValues('regions')
                const currentCountriesValues = form.getValues('countries')
                switch (dashboard) {
                    case LegacyDashboardName.WHAT_WOMEN_WANT_PAKISTAN:
                        if (!currentRegionsValues.includes(d.location_code)) {
                            form.setValue('regions', [...currentRegionsValues, d.location_code])
                        }
                        break
                    case LegacyDashboardName.ECONOMIC_EMPOWERMENT_MEXICO:
                        if (!currentRegionsValues.includes(d.location_code)) {
                            form.setValue('regions', [...currentRegionsValues, d.location_code])
                        }
                        break
                    default:
                        if (!currentCountriesValues.includes(d.location_code)) {
                            form.setValue('countries', [...currentCountriesValues, d.location_code])
                        }
                }
            }

            // Add circles
            svgEl
                .selectAll('myCircles')
                .data(worldBubbleMapsCoordinates)
                .join('circle')
                .attr('class', 'bubble-map-circle')
                .attr('cx', (d: IWorldBubbleMapsCoordinateWithExtra) => {
                    const point = projection([d.lon, d.lat])
                    if (point) return point[0]
                    return 0
                })
                .attr('cy', (d: IWorldBubbleMapsCoordinateWithExtra) => {
                    const point = projection([d.lon, d.lat])
                    if (point) return point[1]
                    return 0
                })
                .attr('r', (d: IWorldBubbleMapsCoordinateWithExtra) => circleSize(d.n))
                .style('fill', (d: IWorldBubbleMapsCoordinateWithExtra) => d.color)
                .style('cursor', 'pointer')
                .attr('stroke', () => 'var(--white)')
                .attr('stroke-width', 1)
                .attr('fill-opacity', 0.5)
                .on('mouseover', onMouseOver)
                .on('mousemove', onMouseMove)
                .on('mouseleave', onMouseLeave)
                .on('click', onClick)
        }

        drawWorldBubbleMap().then()
    }, [
        geoJsonFeatures,
        worldBubbleMapsCoordinates1,
        worldBubbleMapsCoordinates2,
        respondents,
        dashboard,
        lang,
        form1,
        form2,
        bubbleColor1,
        bubbleColor2,
        topoJsonMX,
    ])

    return (
        <div ref={divRef} id="bubble-map" className="relative h-full w-full">
            <svg ref={svgRef} width="100%" style={{ backgroundColor: 'var(--white)' }} />
        </div>
    )
}
