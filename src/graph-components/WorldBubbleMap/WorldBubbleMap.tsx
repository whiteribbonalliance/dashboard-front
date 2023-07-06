'use client'

import { Box } from '@components/Box'
import { GraphTitle } from '@components/GraphTitle'
import { useCampaignQuery } from '@hooks/use-campaign'
import { GraphError } from '@components/GraphError'
import { GraphLoading } from '@components/GraphLoading'
import * as d3 from 'd3'
import { DashboardName } from '@enums'
import React, { useEffect, useRef, useState } from 'react'
import { IWorldBubbleMapsCoordinate } from '@interfaces'
import { classNames, getDashboardConfig, toThousandsSep } from '@utils'
import { useQuery } from 'react-query'
import { useTranslation } from '@app/i18n/client'
import { useFilterFormsStore } from '@stores/filter-forms'
import { UseFormReturn } from 'react-hook-form'
import { Filter } from '@schemas/filter'
import { Dashboard } from '@types'
import { Tooltip } from '@components/Tooltip'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons'
import { useRefetchCampaignStore } from '@stores/refetch-campaign'

interface IWorldBubbleMapsProps {
    dashboard: Dashboard
    lang: string
}

interface IWorldBubbleMapsCoordinateWithColor extends IWorldBubbleMapsCoordinate {
    color: string
}

interface IWorldBubbleMapProps {
    dashboard: Dashboard
    form: UseFormReturn<Filter>
    refetchCampaign: () => void
    respondents: string
    dataGeo: IDataGeo
    worldBubbleMapsCoordinates1?: IWorldBubbleMapsCoordinate[]
    worldBubbleMapsCoordinates2?: IWorldBubbleMapsCoordinate[]
    bubbleColor1: string
    bubbleColor2: string
    lang: string
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

export const WorldBubbleMap = ({ dashboard, lang }: IWorldBubbleMapsProps) => {
    const { data, isError } = useCampaignQuery(dashboard, lang)

    const [showBubbles1, setShowBubbles1] = useState<boolean>(true)
    const [showBubbles2, setShowBubbles2] = useState<boolean>(true)

    const { t } = useTranslation(lang)

    const form1 = useFilterFormsStore((state) => state.form1)
    const refetchCampaign = useRefetchCampaignStore((state) => state.refetchCampaign)

    const config = getDashboardConfig(dashboard)

    // Set respondents
    const respondents = t(config.respondentsNounPlural)

    // Data geo query
    const dataGeoQuery = useQuery<IDataGeo | undefined>({
        queryKey: ['data-geo'],
        queryFn: () =>
            d3.json<IDataGeo>('https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson'),
        refetchOnWindowFocus: false,
    })

    // Set selected tab classes
    let selectedTabClasses: string
    switch (dashboard) {
        case DashboardName.WHAT_YOUNG_PEOPLE_WANT:
            selectedTabClasses = 'border-t-pmnchColors-septenary'
            break
        default:
            selectedTabClasses = 'border-t-defaultColors-tertiary'
    }

    // Set respondents located text
    let respondentsLocatedText: string
    switch (dashboard) {
        case DashboardName.WHAT_WOMEN_WANT:
            respondentsLocatedText = t(`${config.campaignCode}-where-located`)
            break
        default:
            respondentsLocatedText = t('where-located')
    }

    // Set bubble color 1 and bubble color 2
    let bubbleColor1: string
    let bubbleColor2: string
    switch (dashboard) {
        case DashboardName.WHAT_YOUNG_PEOPLE_WANT:
            bubbleColor1 = 'var(--pmnchSecondary)'
            bubbleColor2 = 'var(--pmnchTertiary)'
            break
        default:
            bubbleColor1 = 'var(--defaultPrimary)'
            bubbleColor2 = 'var(--defaultTertiary)'
    }

    // Display world bubble maps or not
    const displayWorldBubbleMaps = !!data && !!dataGeoQuery.data && !!form1 && !!refetchCampaign

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

                {/* Loading (only at first data fetch) */}
                {!displayWorldBubbleMaps && !isError && <GraphLoading dashboard={dashboard} />}

                {/* World bubble maps */}
                {displayWorldBubbleMaps && (
                    <div className="mb-3 mt-3 w-full bg-white">
                        {/* Toggles to show/hide bubbles */}
                        <div className="flex flex-col gap-y-1 px-3 py-3">
                            <div
                                className={classNames('flex cursor-pointer', showBubbles1 ? '' : 'opacity-60')}
                                onClick={() => setShowBubbles1((prev) => !prev)}
                            >
                                <div className="mr-3 flex items-center justify-center">
                                    <FontAwesomeIcon icon={faCircle} style={{ color: bubbleColor1 }} />
                                </div>
                                <p>{data.filter_1_description}</p>
                            </div>

                            {!data.filters_are_identical && (
                                <div
                                    className={classNames('flex cursor-pointer', showBubbles2 ? '' : 'opacity-60')}
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
                            form={form1}
                            refetchCampaign={refetchCampaign}
                            respondents={respondents}
                            dataGeo={dataGeoQuery.data as IDataGeo}
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
    form,
    refetchCampaign,
    respondents,
    dataGeo,
    worldBubbleMapsCoordinates1,
    worldBubbleMapsCoordinates2,
    bubbleColor1,
    bubbleColor2,
    lang,
}: IWorldBubbleMapProps) => {
    const svgRef = useRef<SVGSVGElement>(undefined as any)
    const divRef = useRef<HTMLDivElement>(undefined as any)

    // For 'giz' or 'wwwpakistan', only show the respective country on the map
    if (dashboard === DashboardName.GIZ) {
        dataGeo.features = dataGeo.features.filter((d) => d.properties.name === 'Mexico')
    } else if (dashboard === DashboardName.WWW_PAKISTAN) {
        dataGeo.features = dataGeo.features.filter((d) => d.properties.name === 'Pakistan')
    }

    // Set projection scale and view box
    let projectionScale: number
    let viewBox: string
    switch (dashboard) {
        case DashboardName.GIZ:
            // focus on country
            projectionScale = 1200
            viewBox = `-2130 -500 ${svgWidth} ${svgHeight}`
            break
        case DashboardName.WWW_PAKISTAN:
            // focus on country
            projectionScale = 1750
            viewBox = `2125 -975 ${svgWidth} ${svgHeight}`
            break
        default:
            projectionScale = 144
            viewBox = `0 -125 ${svgWidth} ${svgHeight}`
    }

    // Draw the world bubble map
    useEffect(() => {
        async function drawWorldBubbleMap() {
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
            const projection = d3
                .geoMercator()
                .scale(projectionScale)
                .translate([svgWidth / 2, svgHeight / 2])

            // This variable will be used for the map
            let worldBubbleMapsCoordinates: IWorldBubbleMapsCoordinateWithColor[] = []

            // Set colors for world bubble maps coordinates 1
            let worldBubbleMapsCoordinatesWithColors1: IWorldBubbleMapsCoordinateWithColor[] = []
            if (worldBubbleMapsCoordinates1) {
                worldBubbleMapsCoordinatesWithColors1 = worldBubbleMapsCoordinates1.map((c) => {
                    return { ...c, color: bubbleColor1 } as IWorldBubbleMapsCoordinateWithColor
                })
            }

            // Set colors for world bubble maps coordinates 2
            let worldBubbleMapsCoordinatesWithColors2: IWorldBubbleMapsCoordinateWithColor[] = []
            if (worldBubbleMapsCoordinates2) {
                worldBubbleMapsCoordinatesWithColors2 = worldBubbleMapsCoordinates2.map((c) => {
                    return { ...c, color: bubbleColor2 } as IWorldBubbleMapsCoordinateWithColor
                })
            }

            // Merge the world bubble maps coordinates
            worldBubbleMapsCoordinates = worldBubbleMapsCoordinatesWithColors1.concat(
                worldBubbleMapsCoordinatesWithColors2
            )

            //  Scale for bubble size
            const valueExtent: any = d3.extent(
                worldBubbleMapsCoordinates,
                (d: IWorldBubbleMapsCoordinateWithColor) => +d.n
            )

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
            const onMouseMove = (event: MouseEvent, d: IWorldBubbleMapsCoordinateWithColor) =>
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
            const onClick = (e: MouseEvent, d: IWorldBubbleMapsCoordinateWithColor) => {
                switch (dashboard) {
                    case DashboardName.WWW_PAKISTAN:
                        form.setValue('regions', [d.location_code])
                        break
                    case DashboardName.GIZ:
                        form.setValue('regions', [d.location_code])
                        break
                    default:
                        form.setValue('countries', [d.location_code])
                }

                refetchCampaign()
            }

            // Add circles
            svgEl
                .selectAll('myCircles')
                .data(worldBubbleMapsCoordinates)
                .join('circle')
                .attr('class', 'bubble-map-circle')
                .attr('cx', (d: IWorldBubbleMapsCoordinateWithColor) => {
                    const point = projection([d.lon, d.lat])
                    if (point) return point[0]
                    return 0
                })
                .attr('cy', (d: IWorldBubbleMapsCoordinateWithColor) => {
                    const point = projection([d.lon, d.lat])
                    if (point) return point[1]
                    return 0
                })
                .attr('r', (d: IWorldBubbleMapsCoordinateWithColor) => circleSize(d.n))
                .style('fill', (d: IWorldBubbleMapsCoordinateWithColor) => d.color)
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
        dataGeo,
        worldBubbleMapsCoordinates1,
        worldBubbleMapsCoordinates2,
        respondents,
        dashboard,
        lang,
        projectionScale,
        viewBox,
        form,
        bubbleColor1,
        bubbleColor2,
    ])

    return (
        <div ref={divRef} id="bubble-map" className="relative h-full w-full">
            <svg ref={svgRef} width="100%" style={{ backgroundColor: 'var(--white)' }} />
        </div>
    )
}
