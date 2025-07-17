export interface Post {
	id: number;
	title: string;
	content: string;
	published_at: string;
	small_image: Array<{
		url: string;
	}> | null;
	medium_image: Array<{
		url: string;
	}> | null;
}

export interface ApiResponse {
	data: Post[];
	meta: {
		current_page: number;
		last_page: number;
		per_page: number;
		total: number;
	};
}
