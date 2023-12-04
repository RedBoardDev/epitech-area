<!-- <script>
	import Header from './components/LoginView/header.svelte'
    import Servicetiles from './components/LoginView/servicetiles.svelte';
	// import Card from './components/LoginView/servicetiles.svelte';
	const cards = [
		{
			title: 'Github',
			subtitle: 'Github actions.. ',
			imageUrl: 'Assets/services/githubLogo.png',
		},
		{
			title: 'Spotify',
			subtitle: 'Spotify actions.. ',
			imageUrl: 'Assets/services/githubLogo.png',
		},
	];
</script>
<main>
	<div>
		<Header/>
		{#each cards as card}
			<Servicetiles {...card}/>
		{/each}
	</div>
</main>

<style>
    html, body {
        margin: 0;
        padding: 0;
        height: 100%;
        background-color: rgb(77, 55, 97);
    }

    main {
        text-align: center;
        max-width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
        /* display: flex; */
        flex-direction: column;
        /* justify-content: center; */
        align-items: center;
    }

    @media (min-width: 640px) {
        main {
            max-width: none;
        }
    }
</style> -->

<script>
    import Header from './components/LoginView/header.svelte';
    import Servicetiles from './components/LoginView/servicetiles.svelte';
    import LoginBody from './components/LoginView/body.svelte'
    const cards = [
        {
            title: 'Github',
            subtitle: 'Github actions.. ',
            imageUrl: 'Assets/services/githubLogo.png',
        },
        {
            title: 'Spotify',
            subtitle: 'Spotify actions.. ',
            imageUrl: 'Assets/services/Spotify.png',
        },
        {
            title: 'Google Calendar',
            subtitle: 'Google Calendar actions.. ',
            imageUrl: 'Assets/services/googleCalendar.png',
        },
        {
            title: 'Trello',
            subtitle: 'Trello actions.. ',
            imageUrl: 'Assets/services/trelloLogo.jpeg',
        },
    ];
</script>

<body>
    <main>
        <div>
            <Header/>
            {#each cards as card}
                <Servicetiles {...card} />
            {/each}
            <LoginBody/>
        </div>
    </main>
</body>

<style>
    /* html, body {
        margin: 0;
        padding: 0;
        height: 100%;
        background-color: rgb(83, 45, 118);
    } */

    main {
        /* text-align: center; */
        /* max-width: 100%; */
        /* height: 100%; */
        margin: 0;
        padding: 0;
        /* display: flex; */
        /* flex-direction: column;
        align-items: center; */
    }

    @media (min-width: 640px) {
        main {
            max-width: none;
        }
    }
</style>